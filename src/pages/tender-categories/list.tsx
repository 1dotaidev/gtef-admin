import {
  List,
  useTable,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const TenderCategoryList = () => {
  const { tableProps } = useTable({
    resource: "tender_categories",
    sorters: {
      initial: [
        {
          field: "name",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" sorter />
        <Table.Column 
          dataIndex="description" 
          title="Description"
          render={(value: string) => value?.substring(0, 100) + (value?.length > 100 ? "..." : "")}
        />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField value={value} format="DD/MM/YYYY" />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}; 