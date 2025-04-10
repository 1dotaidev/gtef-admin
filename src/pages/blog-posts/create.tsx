import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select, DatePicker } from "antd";
import { ImageUpload } from "../../components/ImageUpload";

export const BlogPostCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
        <Form.Item
          label={"Event Date"}
          name={["event_date"]}
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
    </Create>
  );
};
