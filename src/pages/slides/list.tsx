import {
  List,
  useTable,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { useUpdate, HttpError } from "@refinedev/core";
import { Table, Space, Image, Switch, message, Tooltip } from "antd";

export const SlideList = () => {
  const { tableProps } = useTable({
    resource: "slides",
    sorters: {
      initial: [
        {
          field: "order_index",
          order: "asc",
        },
      ],
    },
  });

  const { mutate } = useUpdate();

  const handleActiveChange = (checked: boolean, record: any) => {
    mutate(
      {
        resource: "slides",
        id: record.id,
        values: {
          is_active: checked,
        },
      },
      {
        onSuccess: () => {
          message.success(
            `Slide ${checked ? "activated" : "deactivated"} successfully`
          );
        },
        onError: (error) => {
          message.error(
            `Error ${checked ? "activating" : "deactivating"} slide: ${error.message}`
          );
        },
      }
    );
  };

  const handleButtonVisibilityChange = (checked: boolean, record: any) => {
    mutate(
      {
        resource: "slides",
        id: record.id,
        values: {
          show_button: checked,
        },
      },
      {
        onSuccess: () => {
          message.success(
            `Button ${checked ? "enabled" : "disabled"} successfully`
          );
        },
        onError: (error) => {
          message.error(
            `Error ${checked ? "enabling" : "disabling"} button: ${error.message}`
          );
        },
      }
    );
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="order_index"
          title="Order"
          sorter
          defaultSortOrder="ascend"
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="image_url"
          title="Image"
          render={(value: string) => (
            <Image
              src={value}
              alt="Slide"
              style={{ maxWidth: "100px", maxHeight: "60px", objectFit: "cover" }}
            />
          )}
        />
        <Table.Column
          dataIndex="highlight"
          title="Highlight"
          render={(value: string) => value?.substring(0, 30) + "..."}
        />
        <Table.Column
          dataIndex="description"
          title="Description"
          render={(value: string) => value?.substring(0, 50) + "..."}
        />
        <Table.Column
          dataIndex="is_active"
          title="Active"
          render={(value: boolean, record: any) => (
            <Switch
              checked={value}
              onChange={(checked) => handleActiveChange(checked, record)}
            />
          )}
        />
        <Table.Column
          dataIndex="show_button"
          title="Show Button"
          render={(value: boolean, record: any) => (
            <Tooltip title="Toggle button visibility">
              <Switch
                checked={value !== false}
                onChange={(checked) => handleButtonVisibilityChange(checked, record)}
              />
            </Tooltip>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}; 