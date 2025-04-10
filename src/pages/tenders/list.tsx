import {
  List,
  useTable,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  TagField,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useMany } from "@refinedev/core";

interface TenderCategory {
  id: string;
  name: string;
  description?: string;
}

interface Tender {
  id: string;
  title: string;
  reference_number?: string;
  status: string;
  category_id?: string;
  organization?: string;
  published_date?: string;
  closing_date?: string;
  value?: number;
  currency?: string;
  is_featured: boolean;
  is_active: boolean;
}

export const TenderList = () => {
  const { tableProps } = useTable<Tender>({
    resource: "tenders",
    sorters: {
      initial: [
        {
          field: "closing_date",
          order: "asc",
        },
      ],
    },
  });

  const { data: categoriesData, isLoading } = useMany<TenderCategory>({
    resource: "tender_categories",
    ids: tableProps?.dataSource
      ?.map((item) => item?.category_id)
      .filter(Boolean) as string[] || [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const categoryMap = categoriesData?.data?.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item.name,
    }),
    {} as Record<string, string>
  );

  const getStatusTag = (status: string) => {
    const statusColors: Record<string, string> = {
      open: "green",
      closed: "red",
      pending: "orange",
      awarded: "blue",
      cancelled: "gray",
    };

    return (
      <Tag color={statusColors[status.toLowerCase()] || "default"}>
        {status.toUpperCase()}
      </Tag>
    );
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="reference_number"
          title="Reference #"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="category_id"
          title="Category"
          render={(value) => 
            isLoading ? (
              "Loading..."
            ) : (
              categoryMap?.[value] || "-"
            )
          }
        />
        <Table.Column
          dataIndex="organization"
          title="Organization"
        />
        <Table.Column
          dataIndex="published_date"
          title="Published Date"
          render={(value) => <DateField value={value} format="DD/MM/YYYY" />}
        />
        <Table.Column
          dataIndex="closing_date"
          title="Closing Date"
          render={(value) => <DateField value={value} format="DD/MM/YYYY" />}
          sorter
        />
        <Table.Column
          dataIndex="value"
          title="Value"
          render={(value, record: Tender) => 
            value ? `${record.currency || 'INR'} ${value.toLocaleString()}` : "-"
          }
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => getStatusTag(value)}
          filterMultiple={false}
          filters={[
            { text: 'Open', value: 'open' },
            { text: 'Closed', value: 'closed' },
            { text: 'Pending', value: 'pending' },
            { text: 'Awarded', value: 'awarded' },
            { text: 'Cancelled', value: 'cancelled' },
          ]}
          onFilter={(value, record) => record.status === value}
        />
        <Table.Column
          dataIndex="is_featured"
          title="Featured"
          render={(value) => (value ? <Tag color="gold">FEATURED</Tag> : "-")}
          filters={[
            { text: 'Featured', value: true },
            { text: 'Not Featured', value: false },
          ]}
          onFilter={(value, record) => record.is_featured === value}
        />
        <Table.Column
          dataIndex="is_active"
          title="Active"
          render={(value) => (value ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>)}
          filters={[
            { text: 'Active', value: true },
            { text: 'Inactive', value: false },
          ]}
          onFilter={(value, record) => record.is_active === value}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: Tender) => (
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