import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Table, Image, Tag } from "antd";

export const BlogPostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.categoryId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex="image_url"
          title={"Image"}
          render={(value: string) => {
            if (!value) return "-";
            return <Image src={value} alt="Post image" width={50} />;
          }}
        />
        <Table.Column
          dataIndex="content"
          title={"Content"}
          render={(value: any) => {
            if (!value) return "-";
            return <MarkdownField value={value.slice(0, 80) + "..."} />;
          }}
        />
        <Table.Column
          dataIndex={"categoryId"}
          title={"Category"}
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value)?.title
            )
          }
        />
        <Table.Column 
          dataIndex="status" 
          title={"Status"} 
          render={(value: string) => {
            const colorMap: Record<string, string> = {
              draft: "orange",
              published: "green",
              rejected: "red"
            };
            return <Tag color={colorMap[value] || "default"}>{value.toUpperCase()}</Tag>;
          }}
          filterMultiple={false}
          filters={[
            { text: 'Published', value: 'published' },
            { text: 'Draft', value: 'draft' },
            { text: 'Rejected', value: 'rejected' },
          ]}
          onFilter={(value, record) => record.status === value}
        />
        <Table.Column
          dataIndex="event_date"
          title={"Event Date"}
          render={(value: any) => <DateField value={value} format="YYYY-MM-DD HH:mm" />}
          sorter
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} format="YYYY-MM-DD HH:mm" />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
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
