import { LabelDisplayedRowsArgs, TablePaginationProps } from "@mui/material";
import MuiPagination from '@mui/material/Pagination';
import { GridPagination, useGridApiContext } from "@mui/x-data-grid";
function Pagination({
    page,
    onPageChange,
    className,
    rowsPerPage
}: Pick<TablePaginationProps, 'page' | 'className' | 'rowsPerPage' | 'onPageChange'>) {
    const apiRef = useGridApiContext();
    const pageCount = Math.ceil(apiRef.current.getRowsCount() / rowsPerPage);
    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                console.warn("page clickk",event,newPage-1);
                onPageChange(event as any, newPage - 1);
            }}
        />
        );
}
export default function BoardPagination(props: any) {
    return <GridPagination labelDisplayedRows={({from,to,count}: LabelDisplayedRowsArgs)=>{
        //const dsc1 = <Declension num={to} declension={['ый','ой','ий']}/>;
        return <>показаны с <i>{from}</i> по <i>{to}</i> всего <i>{count}</i></>
    }} ActionsComponent={Pagination} {...props} />;
}
