import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { MAIN_COMPONENT_COLOR, MAIN_TEXT_COLOR } from "../constants/colors";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
  { id: 4, col1: "MUI", col2: "is Amazing" },
  { id: 5, col1: "MUI", col2: "is Amazing" },
  { id: 6, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

export default function TrendsTable(props: { width: string; height: string }) {
  return (
    <div style={{ height: props.height, width: props.width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          backgroundColor: MAIN_COMPONENT_COLOR,
          border: 0,
          borderRadius: "10px",
          color: MAIN_TEXT_COLOR,
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5]}
        pagination={true}
        rowSelection={false}
        rowHeight={40}
      />
    </div>
  );
}
