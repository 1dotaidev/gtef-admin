import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Switch,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const TenderCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "tenders",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "tender_categories",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter tender title" }]}
        >
          <Input placeholder="Enter tender title" />
        </Form.Item>

        <Form.Item
          label="Reference Number"
          name="reference_number"
          help="Unique identifier for this tender"
        >
          <Input placeholder="Enter reference number" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter tender description"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
        >
          <Select
            {...categorySelectProps}
            placeholder="Select a category"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Organization"
          name="organization"
        >
          <Input placeholder="Enter organization name" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          label="Published Date"
          name="published_date"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Closing Date"
          name="closing_date"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
          rules={[{ required: true, message: "Please select closing date" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Tender Value"
          name="value"
        >
          <InputNumber
            placeholder="Enter value"
            style={{ width: "100%" }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') || ''}
          />
        </Form.Item>

        <Form.Item
          label="Currency"
          name="currency"
          initialValue="INR"
        >
          <Select
            options={[
              { label: "INR (₹)", value: "INR" },
              { label: "USD ($)", value: "USD" },
              { label: "EUR (€)", value: "EUR" },
              { label: "GBP (£)", value: "GBP" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="open"
        >
          <Select
            options={[
              { label: "Open", value: "open" },
              { label: "Closed", value: "closed" },
              { label: "Pending", value: "pending" },
              { label: "Awarded", value: "awarded" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Tender URL"
          name="tender_url"
          help="External link to the original tender posting"
        >
          <Input placeholder="https://example.com/tenders/123" />
        </Form.Item>

        <Form.Item
          label="Document URL"
          name="document_url"
          help="Link to the tender document"
        >
          <Input placeholder="https://example.com/documents/tender-123.pdf" />
        </Form.Item>

        <Form.Item
          label="Featured"
          name="is_featured"
          valuePropName="checked"
          initialValue={false}
          help="Highlight this tender on the website"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Active"
          name="is_active"
          valuePropName="checked"
          initialValue={true}
          help="Only active tenders are visible to the public"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}; 