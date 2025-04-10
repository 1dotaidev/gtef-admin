import { Show, TextField, DateField } from "@refinedev/antd";
import { useShow, useMany } from "@refinedev/core";
import { Typography, Descriptions, List, Card } from "antd";

const { Title, Paragraph } = Typography;

export const TenderCategoryShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: tendersData, isLoading: tendersIsLoading } = useMany({
    resource: "tenders",
    ids: [],
    queryOptions: {
      enabled: !!record?.id,
    },
    meta: {
      filters: [
        {
          field: "category_id",
          operator: "eq",
          value: record?.id,
        },
      ],
    },
  });

  const tenders = tendersData?.data || [];

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{record?.name}</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Description">
          <Paragraph>{record?.description || "-"}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          <DateField value={record?.created_at} format="DD/MM/YYYY HH:mm" />
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          <DateField value={record?.updated_at} format="DD/MM/YYYY HH:mm" />
        </Descriptions.Item>
      </Descriptions>

      <Title level={5} style={{ marginTop: 20 }}>Tenders in this category</Title>
      {tendersIsLoading ? (
        <Paragraph>Loading tenders...</Paragraph>
      ) : tenders.length === 0 ? (
        <Paragraph>No tenders found in this category.</Paragraph>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={tenders}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <p>Reference: {item.reference_number || "-"}</p>
                <p>Status: {item.status?.toUpperCase() || "-"}</p>
                <p>Closing Date: <DateField value={item.closing_date} format="DD/MM/YYYY" /></p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Show>
  );
}; 