import { List, useTable, DateField } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/antd";

export const MembersTenderList = () => {
  const { tableProps } = useTable({
    resource: "members_tenders",
    syncWithLocation: true,
    meta: {
      select: '*, members_tender_categories(name)'
    }
  });

  const getStatusTag = (status: string) => {
    const colorMap: Record<string, string> = {
      draft: "orange",
      published: "green",
      rejected: "red"
    };
    return <Tag color={colorMap[status] || "default"}>{status.toUpperCase()}</Tag>;
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column 
          dataIndex="title" 
          title="Title"
          sorter
        />
        <Table.Column
          dataIndex="members_category_id"
          title="Category"
          render={(value, record: any) => 
            record.members_tender_categories?.name || "Uncategorized"
          }
        />
        <Table.Column
          dataIndex="deadline"
          title="Deadline"
          render={(value) => <DateField value={value} format="YYYY-MM-DD" />}
          sorter
        />
        <Table.Column
          dataIndex="contact_person"
          title="Contact Person"
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => getStatusTag(value)}
          sorter
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