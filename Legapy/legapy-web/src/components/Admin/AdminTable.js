import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { format } from 'date-fns'
import { observer } from 'mobx-react'
import Checkbox from 'material-ui/Checkbox'
// import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table'
import { Row, FullColumn, HalfColumn, Column } from '../../components/utility/rowColumn'
import Papersheet, { DemoWrapper } from '../../components/utility/papersheet'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import Scrollbars from '../../components/utility/customScrollBar'
import DeleteIcon from '@material-ui/icons/Delete'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import AddIcon from '@material-ui/icons/Add'

const CustomTableCell = withStyles(theme => ({
    head: {
        color: '#424242',
        fontWeight: 600,
        fontSize: '13px',
    },
}))(TableCell)

const EnhancedTableHead = ({
    columns, onSelectAllClick, numSelected, rowCount,
}) => (
    <TableHead>
        <TableRow>
            {columns.map(column => (
                <CustomTableCell key={column.dataIndex}>{column.title}</CustomTableCell>
            ))}
            <CustomTableCell />
        </TableRow>
    </TableHead>
)

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
})

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = (event) => {
        this.props.onChangePage(event, 0)
    };

    handleBackButtonClick = (event) => {
        this.props.onChangePage(event, this.props.page - 1)
    };

    handleNextButtonClick = (event) => {
        this.props.onChangePage(event, this.props.page + 1)
    };

    handleLastPageButtonClick = (event) => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
            true,
        )
    };

    render() {
        const {
            classes, count, page, rowsPerPage, dataListLength, theme,
        } = this.props

        return (
            <div className={classes.root}>
                <IconButton
                  onClick={this.handleFirstPageButtonClick}
                  disabled={page === 0}
                  aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                  onClick={this.handleBackButtonClick}
                  disabled={page === 0}
                  aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                  onClick={this.handleNextButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                  onClick={this.handleLastPageButtonClick}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        )
    }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions)

@withRouter
@observer
class AdminTable extends Component {
    state = {
        page: 0,
        rowsPerPage: 10,
    }

    handleChangePage = (event, page, isToLast) => {
        if (isToLast && this.props.pullMore && this.props.dataList.length < this.props.count) {
            this.setState({ page: Math.floor(this.props.dataList.length / this.state.rowsPerPage) })
        } else {
            this.setState({ page })
        }

        // Get more pages from server
        const { rowsPerPage } = this.state
        const { dataList, count, pullMore } = this.props
        if (count && (page * rowsPerPage >= dataList.length)) {
            pullMore(page, 100)
        }
    }

    handleChangeRowsPerPage = (event) => {
        if (this.props.pullMore) {
            this.setState({ page: 0 })
        }
        this.setState({ rowsPerPage: event.target.value })
    }

    onDelete = (id, index) => {
        this.props.onDelete(id, index)
    }

    getCell = (data, dataList, column) => {
        let text
        if (column.custom) {
            text = column.custom(data[column.dataIndex], dataList)
        } else {
            text = data[column.dataIndex] || ''
        }
        if (typeof text === 'string' && column.limit && text.length >= column.limit) {
            text = text.slice(0, column.limit) + '...'
        }
        return text
    }

    render() {
        const { selected, page, rowsPerPage } = this.state
        const {
            columns, dataList, match, count,
        } = this.props
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataList.length - page * rowsPerPage)
        return (
            <Scrollbars style={{ width: '100%' }} className="shadow">
                <Papersheet>
                    <Table style={{ width: '100%', display: 'table' }}>
                        <EnhancedTableHead
                          onSelectAllClick={this.handleSelectAllClick}
                          rowCount={dataList.length}
                          columns={columns}
                        />
                        <TableBody>
                            {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        const isSelected = false // this.isSelected(item.ID)
                                        return (
                                            <TableRow
                                              key={item.ID}
                                              aria-checked={isSelected}
                                              selected={isSelected}
                                              className="table-row"
                                            >
                                                {columns.map(column => (
                                                    <TableCell
                                                      key={`${item.ID}${column.dataIndex}`}
                                                    >
                                                        {this.getCell(item, dataList, column)}
                                                    </TableCell>
                                                ))}
                                                <TableCell>
                                                    <Link to={`${match.path}/${item.ID}`}>
                                                        <Button
                                                          color="secondary"
                                                          className="row-editar"
                                                        >
                                                            Editar
                                                        </Button>
                                                    </Link>
                                                    <IconButton
                                                      className="row-deletar"
                                                      onClick={() => this.onDelete(item.ID, index)}
                                                    >
                                                        <DeleteIcon>delete</DeleteIcon>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
})
                                    }
                            {emptyRows > 0 && (
                            <TableRow style={{ height: 57 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                                    )}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="pagination-footer">
                                <TablePagination
                                  colSpan={3}
                                  count={count || dataList.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onChangePage={this.handleChangePage}
                                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                  Actions={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Papersheet>
            </Scrollbars>
        )
    }
}

export default AdminTable
