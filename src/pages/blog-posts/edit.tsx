import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select, DatePicker, Divider, Checkbox, Space } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { ImageUpload } from "../../components/ImageUpload";

export const BlogPostEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm();
  const [isMarathon, setIsMarathon] = useState(false);
  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.categoryId,
    optionLabel: "title",
    optionValue: "id",
    queryOptions: {
      enabled: !!blogPostsData,
    },
  });

  // Check if the selected category is Marathon
  useEffect(() => {
    const checkCategory = async () => {
      // Check initial value
      const categoryId = blogPostsData?.categoryId;
      if (categoryId) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/categories?id=eq.${categoryId}`, {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (data && data.length > 0) {
            setIsMarathon(data[0].title?.toLowerCase().includes('marathon'));
          }
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      }
    };

    checkCategory();
  }, [blogPostsData]);

  // Handle category change
  const handleCategoryChange = async (value: string) => {
    if (value) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/categories?id=eq.${value}`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setIsMarathon(data[0].title?.toLowerCase().includes('marathon'));
        } else {
          setIsMarathon(false);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setIsMarathon(false);
      }
    } else {
      setIsMarathon(false);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form 
        {...formProps} 
        layout="vertical"
        onValuesChange={(changedValues) => {
          if (changedValues.categoryId) {
            handleCategoryChange(changedValues.categoryId);
          }
        }}
      >
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Content"}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item
          label={"Image"}
          name={["image_url"]}
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL",
            },
          ]}
        >
          <ImageUpload
            onImageUploaded={(url) => {
              formProps.form?.setFieldsValue({ image_url: url });
            }}
            currentImageUrl={formProps.form?.getFieldValue("image_url")}
          />
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
          <Form.Item
            label={"Location"}
            name={["location"]}
            help="Venue or place where the event will be held"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["show_location"]}
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox>Show location in post</Checkbox>
          </Form.Item>
        </Space>

        {isMarathon && (
          <>
            <Divider orientation="left">Marathon Event Details</Divider>
            <Form.Item
              label={"Sponsors Image"}
              name={["sponsors_image_url"]}
              help="Banner showing all sponsors of this marathon event"
            >
              <ImageUpload
                onImageUploaded={(url) => {
                  formProps.form?.setFieldsValue({ sponsors_image_url: url });
                }}
                currentImageUrl={formProps.form?.getFieldValue("sponsors_image_url")}
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          label={"Event Date"}
          name={["event_date"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={"Category"}
          name={"categoryId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "rejected", label: "Rejected" },
            ]}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
