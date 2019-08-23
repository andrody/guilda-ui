import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { toast } from './toast';

// Get Domain from LocalStorage
let axiosInstance;
let _mock;
let _renewTokenEndpoint;
let _defaultEnv;
const getDomain = () =>
	(JSON.parse(localStorage.getItem('nanui-env')) || {}).url;
const isProduction = process.env.NODE_ENV === 'production';

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest, onRefreshedToken) => {
	return axiosInstance
		.post(_renewTokenEndpoint, {
			token: localStorage.getItem('nanui-token'),
			renewalToken: localStorage.getItem('nanui-token-renewal'),
		})
		.then((tokenRefreshResponse) => {
			// console.log('tokenRefreshResponse', tokenRefreshResponse);
			// localStorage.setItem('nanui-token', token);
			// localStorage.setItem('nanui-token-renewal', renewalToken);
			const [token] = onRefreshedToken(tokenRefreshResponse.data);
			failedRequest.response.config.headers.Authentication = token;
			return Promise.resolve();
		});
};

// Logic to get from Mock
async function getFromMock(method, url) {
	return new Promise((resolve) => {
		const data = _mock.data[0].routes.find(
			(e) => '/' + e.endpoint === url && e.method === method
		);
		if (data) {
			setTimeout(() => {
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
		`%c[${response.config.method.toUpperCase()}] ` +
			response.config.url.substring(response.config.baseURL.length),
		'color: #f1c40f; background-color: black'
	);
	console.log('Response: ', response);
	console.log(
		'Enviado: ',
		JSON.parse(response.config.data) || response.config.params
	);
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
export function initRequest({
	defaultEnv,
	mock,
	renewTokenEndpoint,
	onRefreshedToken,
}) {
	_mock = mock;
	_renewTokenEndpoint = renewTokenEndpoint;
	_defaultEnv = defaultEnv;

	// Create Axios Instance
	axiosInstance = axios.create({
		baseURL: getDomain() || defaultEnv.url,
		headers: { 'Content-Type': 'application/json' },
	});

	// Create renewal of token logic
	createAuthRefreshInterceptor(
		axiosInstance,
		(failedRequest) => refreshAuthLogic(failedRequest, onRefreshedToken),
		{
			statusCodes: [403],
		}
	);

	axiosInstance.interceptors.request.use((request) => {
		const token = localStorage.getItem('nanui-token');

		if (token) {
			request.headers['Authorization'] = token;
		}
		return request;
	});

	// Handle Response
	axiosInstance.interceptors.response.use(
		(response) => {
			if (!isProduction) {
				printRequest(response);
			}
			return response;
		},
		(error) => {
			if (error.response) {
				printRequest(error.response);
				try {
					if (error.status !== '403') {
						toast(error.response.data.errors[0].descriptions[0], 'error');
					}
				} catch (e) {
					toast('Erro desconhecido no servidor', 'error');
				}
				throw error;
			} else if (error.request) {
				console.error(error, error.request);
				toast('Sem resposta do servidor', 'error');
				// printRequest({config: { method: '', }});
			} else {
				toast('Erro desconhecido', 'error');
				console.error(error);
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance;
}

/*
 * Returns .get, .post, .patch, .put, .post, .save, .axiosInstance
 */
function send(method, url, data, config) {
	if ((getDomain() || '').toLowerCase() === 'mock') {
		return getFromMock(method, url);
	}
	// console.log(getDomain(), url, method, data, config)

	return axiosInstance({
		baseURL: getDomain(),
		url,
		method,
		data,
		...config,
	});
}

export const request = {
	// Axios API to send request
	save: async (endpoint, data, config) =>
		send(data.id ? 'put' : 'post', endpoint, data, config),
	get: (url, config) => send('get', url, null, config),
	post: (...args) => send('post', ...args),
	put: (...args) => send('put', ...args),
	patch: (...args) => send('patch', ...args),
	delete: (...args) => send('delete', ...args),
	axiosInstance,
};
