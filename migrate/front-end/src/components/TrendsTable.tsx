import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material";
import styled from "styled-components";
import {
  INPUT_COLOR,
  MAIN_COLOR,
  MAIN_COMPONENT_COLOR,
  MAIN_TEXT_COLOR,
} from "../colors";

//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
  },
];

const Example = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 25,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 25,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 25,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 25,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 25,
      },
    ],
    []
  );

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          initialState={{
            density: "compact",
            pagination: { pageSize: 5, pageIndex: 0 },
          }}
          muiTablePaginationProps={{ rowsPerPageOptions: [5] }}
          muiTablePaperProps={{
            sx: {
              backgroundColor: MAIN_COMPONENT_COLOR,
            },
          }}
        />
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* height: 10%; */
  overflow: auto !important;
  position: relative;
  width: 70%;
`;

const theme = createTheme({
  palette: {
    background: { default: MAIN_COMPONENT_COLOR },
    primary: { main: MAIN_COLOR },
    divider: INPUT_COLOR,
  },
});

export default Example;
