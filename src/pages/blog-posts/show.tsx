import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography, Image, Tag, Divider } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const BlogPostShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.categoryId || "",
    queryOptions: {
      enabled: !!record?.categoryId,
    },
  });

  const isMarathon = categoryData?.data?.title?.toLowerCase().includes('marathon');

  const getStatusTag = (status: string) => {
    const colorMap: Record<string, string> = {
      draft: "orange",
      published: "green",
      rejected: "red"
    };
    return <Tag color={colorMap[status] || "default"}>{status.toUpperCase()}</Tag>;
  };

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Content"}</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>{"Image"}</Title>
      {record?.image_url ? (
        <Image src={record.image_url} alt="Post image" style={{ maxWidth: '100%', marginBottom: '24px' }} />
      ) : (
        <TextField value="No image available" />
      )}

      {record?.location && record?.show_location && (
        <>
          <Title level={5}>{"Location"}</Title>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            <TextField value={record.location} />
          </div>
        </>
      )}

      {isMarathon && record?.sponsors_image_url && (
        <>
          <Divider orientation="left">Marathon Event Details</Divider>
          <Title level={5}>{"Sponsors"}</Title>
          <Image 
            src={record.sponsors_image_url} 
            alt="Event sponsors" 
            style={{ maxWidth: '100%', marginBottom: '24px' }} 
          />
        </>
      )}

      <Title level={5}>{"Event Date"}</Title>
      <DateField value={record?.event_date} format="YYYY-MM-DD HH:mm" />
      <Title level={5}>{"Category"}</Title>
      <TextField
        value={
          categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>
        }
      />
      <Title level={5}>{"Status"}</Title>
      {record?.status ? getStatusTag(record.status) : <TextField value="-" />}
      <Title level={5}>{"Created At"}</Title>
      <DateField value={record?.createdAt} format="YYYY-MM-DD HH:mm" />
      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record?.updatedAt} format="YYYY-MM-DD HH:mm" />
    </Show>
  );
};
