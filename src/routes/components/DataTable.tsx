import { DataGrid } from '@mui/x-data-grid';

interface TableProps {
  rows: any;
  columns: any;
}

export default function DataTable({ rows, columns }: TableProps) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
