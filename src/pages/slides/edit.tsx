import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Select } from "antd";
import { ImageUpload } from "../../components/ImageUpload";

const DEFAULT_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)";
const DEFAULT_BUTTON_TEXT = "Learn More";

export const SlideEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "slides",
    meta: {
      fields: [
        "id",
        "title",
        "highlight",
        "description",
        "image_url",
        "button_text",
        "button_link",
        "show_button",
        "gradient",
        "is_active",
        "order_index",
        "created_at",
        "button_type"
      ],
      pluralize: false,
    },
    transformValues: (values) => ({
      ...values,
    }),
  });

  const slideData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          help="Optional: Main title displayed on the slide"
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Highlight Text"
          name="highlight"
          help="Optional: Text displayed above the title (usually highlighted)"
        >
          <Input placeholder="Enter highlight text" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          help="Optional: Detailed description shown under the title"
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image_url"
          rules={[{ required: true }]}
        >
          <ImageUpload 
            buttonText="Upload Slide Image" 
            directory="slides"
          />
        </Form.Item>
        <Form.Item
          label="Gradient"
          name="gradient"
          help="Optional: CSS gradient for text area"
          initialValue={DEFAULT_GRADIENT}
        >
          <Input placeholder={DEFAULT_GRADIENT} />
        </Form.Item>
        <Form.Item
          label="Button Text"
          name="button_text"
          help="Optional: Text shown on the call-to-action button"
        >
          <Input placeholder="Enter button text" />
        </Form.Item>
        <Form.Item
          label="Button Type"
          name="button_type"
          initialValue="primary"
        >
          <Select
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Text", value: "text" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Button Link"
          name="button_link"
          help="Optional: URL the button links to"
        >
          <Input placeholder="Enter button link URL" />
        </Form.Item>
        <Form.Item
          label="Show Button"
          name="show_button"
          valuePropName="checked"
          help="Whether to display the button on this slide"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Order Index"
          name="order_index"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Active"
          name="is_active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}; 