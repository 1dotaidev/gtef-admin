import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/antd";

export const MembersTenderCategoryList = () => {
  const { tableProps } = useTable({
    resource: "members_tender_categories",
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column 
          dataIndex="name" 
          title="Name"
          sorter
        />
        <Table.Column
          dataIndex="description"
          title="Description"
          ellipsis={{ showTitle: true }}
        />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField value={value} format="YYYY-MM-DD" />}
          sorter
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}; 