import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const TenderCategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "tender_categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter category description"
          />
        </Form.Item>
      </Form>
    </Create>
  );
}; 