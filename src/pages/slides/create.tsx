import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Select } from "antd";
import { ImageUpload } from "../../components/ImageUpload";

const DEFAULT_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)";
const DEFAULT_BUTTON_TEXT = "Learn More";

export const SlideCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "slides",
    meta: {
      fields: [
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
        "button_type"
      ],
      pluralize: false,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          help="Optional: Main title displayed on the slide"
          initialValue=""
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          label="Highlight Text"
          name="highlight"
          help="Optional: Text displayed above the title (usually highlighted)"
          initialValue=""
        >
          <Input placeholder="Enter highlight text" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          help="Optional: Detailed description shown under the title"
          initialValue=""
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image_url"
          rules={[{ required: true }]}
        >
          <ImageUpload 
            onImageUploaded={(url) => {
              formProps.form?.setFieldsValue({ image_url: url });
            }}
            currentImageUrl={formProps.form?.getFieldValue("image_url")}
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
          initialValue={DEFAULT_BUTTON_TEXT}
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
          initialValue="#"
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
          initialValue={1}
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
    </Create>
  );
}; 