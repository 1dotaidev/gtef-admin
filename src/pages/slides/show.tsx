import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Image, Tag, Space } from "antd";

const { Title, Text } = Typography;

export const SlideShow = () => {
  const { queryResult } = useShow({
    resource: "slides",
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Highlight</Title>
      <Text>{record?.highlight}</Text>

      <Title level={5}>Description</Title>
      <Text>{record?.description}</Text>

      <Title level={5}>Image</Title>
      {record?.image_url && (
        <Image
          src={record.image_url}
          alt={record.title}
          style={{ maxWidth: "400px" }}
        />
      )}

      <Title level={5}>Gradient</Title>
      <div
        style={{
          height: "50px",
          background: record?.gradient,
          marginBottom: "1rem",
          borderRadius: "4px",
        }}
      />
      <Text code>{record?.gradient}</Text>

      <Title level={5}>Button</Title>
      <Space direction="vertical">
        <Text>Text: {record?.button_text}</Text>
        <Text>
          Type: <Tag color="blue">{record?.button_type}</Tag>
        </Text>
        <Text>
          Link: <a href={record?.button_link} target="_blank" rel="noopener noreferrer">{record?.button_link}</a>
        </Text>
      </Space>

      <Title level={5}>Order Index</Title>
      <Text>{record?.order_index}</Text>

      <Title level={5}>Status</Title>
      <Tag color={record?.is_active ? "green" : "red"}>
        {record?.is_active ? "Active" : "Inactive"}
      </Tag>
    </Show>
  );
}; 