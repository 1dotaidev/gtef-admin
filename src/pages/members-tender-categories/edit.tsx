import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const MembersTenderCategoryEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: "members_tender_categories",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the category name" }]}
          help="Name of the member's tender category"
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          help="Brief description of what this category includes"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter category description"
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}; 