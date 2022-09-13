import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    colSpan: number | undefined;
  }
  interface TableMeta {
    colSpan: number | undefined;
  }
}