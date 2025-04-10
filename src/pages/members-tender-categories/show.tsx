import { DateField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Divider, Card } from "antd";
import { FileOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const MembersTenderCategoryShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
        <Title level={3}>{record?.name}</Title>
        <Divider />
        
        <Title level={5}>Description</Title>
        <Paragraph>{record?.description || "No description provided"}</Paragraph>
        
        <Divider />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <Title level={5}>ID</Title>
            <TextField value={record?.id} />
          </div>
          
          <div>
            <Title level={5}>Created At</Title>
            <DateField value={record?.created_at} format="YYYY-MM-DD HH:mm" />
          </div>
          
          <div>
            <Title level={5}>Updated At</Title>
            <DateField value={record?.updated_at} format="YYYY-MM-DD HH:mm" />
          </div>
        </div>
      </Card>
    </Show>
  );
}; 