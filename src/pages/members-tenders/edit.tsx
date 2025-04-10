import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { ImageUpload } from "../../components/ImageUpload";

export const MembersTenderEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: "members_tenders",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "members_tender_categories",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter tender title" }]}
        >
          <Input placeholder="Enter tender title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          help="Detailed description of the tender requirements"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter tender description"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="members_category_id"
          help="Select a category for this members' tender"
        >
          <Select
            {...categorySelectProps}
            placeholder="Select a category"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Document URL"
          name="document_url"
          help="Upload or provide a link to tender documents"
        >
          <ImageUpload
            onImageUploaded={(url: string) => {
              formProps.form?.setFieldsValue({ document_url: url });
            }}
            currentImageUrl={formProps.form?.getFieldValue("document_url")}
          />
        </Form.Item>

        <Form.Item
          label="Contact Person"
          name="contact_person"
          help="Name of the person to contact for inquiries"
        >
          <Input placeholder="Enter contact person name" />
        </Form.Item>

        <Form.Item
          label="Contact Email"
          name="contact_email"
          rules={[{ type: 'email', message: 'Please enter a valid email' }]}
          help="Email address for tender inquiries"
        >
          <Input placeholder="Enter contact email" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="draft"
        >
          <Select
            options={[
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}; 