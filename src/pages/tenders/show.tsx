import { Show, TextField, DateField, TagField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Descriptions, Tag, Space } from "antd";

const { Title, Paragraph } = Typography;

export const TenderShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne({
    resource: "tender_categories",
    id: record?.category_id || "",
    queryOptions: {
      enabled: !!record?.category_id,
    },
  });

  const getStatusTag = (status: string) => {
    const statusColors: Record<string, string> = {
      open: "green",
      closed: "red",
      pending: "orange",
      awarded: "blue",
      cancelled: "gray",
    };

    return (
      <Tag color={statusColors[status?.toLowerCase()] || "default"}>
        {status?.toUpperCase() || ""}
      </Tag>
    );
  };

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{record?.title}</Title>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Reference Number">
          <TagField value={record?.reference_number} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {record?.status && getStatusTag(record.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {categoryData?.data?.name || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Organization">
          {record?.organization || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Published Date">
          <DateField value={record?.published_date} format="DD/MM/YYYY" />
        </Descriptions.Item>
        <Descriptions.Item label="Closing Date">
          <DateField value={record?.closing_date} format="DD/MM/YYYY" />
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          {record?.location || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Value">
          {record?.value
            ? `${record.currency || "INR"} ${record.value.toLocaleString()}`
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Flags" span={2}>
          <Space>
            {record?.is_featured && <Tag color="gold">FEATURED</Tag>}
            {record?.is_active ? (
              <Tag color="green">ACTIVE</Tag>
            ) : (
              <Tag color="red">INACTIVE</Tag>
            )}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          <Paragraph>{record?.description || "-"}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Tender Link" span={2}>
          {record?.tender_url ? (
            <a href={record.tender_url} target="_blank" rel="noopener noreferrer">
              {record.tender_url}
            </a>
          ) : (
            "-"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Document" span={2}>
          {record?.document_url ? (
            <a href={record.document_url} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          ) : (
            "No document available"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <DateField value={record?.created_at} format="DD/MM/YYYY HH:mm" />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <DateField value={record?.updated_at} format="DD/MM/YYYY HH:mm" />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
}; 