import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Get Domain from LocalStorage
var axiosInstance;
const getDomain = () => JSON.parse(localStorage.getItem('nanui-env')).url;
const isProduction = process.env.NODE_ENV === 'production';

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest, onRefreshed) =>
	axios.post(getDomain() + '/renew-token').then((tokenRefreshResponse) => {
		// if (onRefreshed) onRefreshed();
		localStorage.setItem('token', tokenRefreshResponse.data.token);
		failedRequest.response.config.headers['Authentication'] =
			'Bearer ' + tokenRefreshResponse.data.token;
		return Promise.resolve();
	});

// Logic to get from Mock
async function getFromMock(method, url) {
	return new Promise(function(resolve, reject) {
		const data = mock.data[0].routes.find(
			(e) => '/' + e.endpoint === url && e.method === method
		);
		if (data) {
			setTimeout(function() {
				resolve({
					data: JSON.parse(data.body),
					status: data.statusCode,
				});
			}, (data && data.latency) || 0);
		}
	});
}

// Print requests on devtools
function printRequest(response) {
    console.group(
        `%c[${response.config.method.toUpperCase()}] ` + url,
        'color: #f1c40f; background-color: black'
    );
    console.log('Enviado: ', response.config.data);
    console.log(
        'Recebido: ',
        response ? response.data : 'Erro de conexão. Sem contato com servidor'
    );
    console.groupEnd();
}

/*
 * OnRefreshed: Callback to update token on localStorage: eg: () => localStorage.setItem('token', tokenRefreshResponse.data.token);
 * getAccessToken: Callback to always get updated token from localStorage; eg: () => ;
 */
export function initRequest(mock) {

	// Create Axios Instance
	axiosInstance = axios.create({
		baseURL: getDomain(),
		headers: { 'Content-Type': 'application/json' },
	});

	// Create renewal of token logic
	createAuthRefreshInterceptor(axios, (failedRequest) =>
		refreshAuthLogic(failedRequest)
    );
    
	axios.interceptors.request.use((request) => {
        const user = localStorage.getItem('nanui-user') || {}

        if (user.token) { 
            request.headers['Authorization'] = user.token;
        }
		return request
	});

	// Print requests payloads on dev
	if (!isProduction) {
		axios.interceptors.response.use((response) => {
            printRequest(response)
            return response
		}, error => {
            return Promise.reject(error)
        });
	}

	return axiosInstance;
}

/*
* Returns .get, .post, .patch, .put, .post, .save, .axiosInstance
*/
export default function request() {

    // Axios API to send request
    function send(method, url, data, config) {
        if (getDomain().toLowerCase() === 'mock') {
            const response = await getFromMock(method, url)
            return response
        }
        return axiosInstance({
            baseURL: getDomain(),
            url,
            method,
            data,
            ...config
          })
    }

    // SAVE
    function save(endpoint, data, config) {
        send(data.id ? 'put': 'post', endpoint, data, config)
    }

	return {
        get: (url, config) => send('get', url, config),
        post: (...args) => send('post', ...args),
        put: (...args) => send('put', ...args),
        patch: (...args) => send('patch', ...args),
        delete: (...args) => send('delete', ...args),
        save,
        axiosInstance
    };
}