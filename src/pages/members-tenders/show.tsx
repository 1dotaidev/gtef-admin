import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Space, Tag, Image, Divider } from "antd";
import { FileOutlined, CalendarOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const MembersTenderShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "members_tender_categories",
    id: record?.members_category_id || "",
    queryOptions: {
      enabled: !!record?.members_category_id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />

      <Title level={5}>Description</Title>
      <MarkdownField value={record?.description} />

      {record?.document_url && (
        <>
          <Title level={5}>Document</Title>
          <Space>
            <FileOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <a href={record.document_url} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </Space>
          <div style={{ marginTop: '16px' }}>
            <Image 
              src={record.document_url} 
              alt="Document Preview" 
              style={{ maxWidth: '100%', maxHeight: '300px' }} 
            />
          </div>
        </>
      )}

      <Divider />

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <CalendarOutlined style={{ color: '#1890ff' }} />
          <Title level={5} style={{ margin: 0 }}>Deadline:</Title>
          <DateField value={record?.deadline} format="YYYY-MM-DD" />
        </Space>

        <Space>
          <Title level={5} style={{ margin: 0 }}>Category:</Title>
          <span>
            {categoryIsLoading ? "Loading..." : categoryData?.data?.name || "Uncategorized"}
          </span>
        </Space>

        {record?.contact_person && (
          <Space>
            <UserOutlined style={{ color: '#1890ff' }} />
            <Title level={5} style={{ margin: 0 }}>Contact Person:</Title>
            <span>{record.contact_person}</span>
          </Space>
        )}

        {record?.contact_email && (
          <Space>
            <MailOutlined style={{ color: '#1890ff' }} />
            <Title level={5} style={{ margin: 0 }}>Contact Email:</Title>
            <a href={`mailto:${record.contact_email}`}>{record.contact_email}</a>
          </Space>
        )}

        <Space>
          <Title level={5} style={{ margin: 0 }}>Status:</Title>
          <Tag color={
            record?.status === "published" ? "green" : 
            record?.status === "draft" ? "orange" : 
            record?.status === "rejected" ? "red" : "default"
          }>
            {record?.status?.toUpperCase()}
          </Tag>
        </Space>
      </Space>

      <Divider />

      <Space direction="vertical" size="small">
        <Title level={5}>Created At</Title>
        <DateField value={record?.created_at} format="YYYY-MM-DD HH:mm" />
        
        <Title level={5}>Updated At</Title>
        <DateField value={record?.updated_at} format="YYYY-MM-DD HH:mm" />
      </Space>
    </Show>
  );
}; 