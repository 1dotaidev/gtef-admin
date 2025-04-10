import {
  DateField,
  List,
  EmailField,
} from "@refinedev/antd";
import { Table, Select, message, Tooltip, Tag } from "antd";
import { useState, useEffect } from "react";
import { supabaseClient } from "../../utility";

type User = {
  id: string;
  email: string;
  created_at: string;
  membership_type: string | null;
  membership_expiry: string | null;
};

// Internal type for API response
type ApiUser = User & {
  is_admin: boolean;
};

// Define membership options with their details
const MEMBERSHIP_TYPES = [
  { 
    value: "Individual International", 
    label: "Individual International", 
    description: "₹1,500 + GST / Year" 
  },
  { 
    value: "Chapter Membership", 
    label: "Chapter Membership", 
    description: "₹1,500 + GST / Year" 
  },
  { 
    value: "Corporate", 
    label: "Corporate", 
    description: "Corporate / Year" 
  },
  { 
    value: "Institutional", 
    label: "Institutional", 
    description: "Institutional / Year" 
  },
  { 
    value: "Charter or Lifetime", 
    label: "Charter or Lifetime", 
    description: "₹1,00,000 + GST" 
  },
  { 
    value: "Student", 
    label: "Student", 
    description: "₹750 + GST / Year" 
  },
];

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});

  // Get current user ID on component mount
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      if (data?.user) {
        setCurrentUserId(data.user.id);
      }
    };
    getCurrentUser();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get users without admin users
      const { data, error } = await supabaseClient.rpc('get_users_with_admin_status');
      
      if (error) {
        console.error("Error fetching users:", error);
        // Fallback method if RPC fails
        const { data: authUsers } = await supabaseClient.auth.admin.listUsers();
        
        // For each user, check admin status to filter out admins
        if (authUsers?.users) {
          const nonAdminUsers = await Promise.all(
            authUsers.users
              // Filter out the current user
              .filter(user => user.id !== currentUserId)
              .map(async (user) => {
                const { data: adminData } = await supabaseClient
                  .from('admin_users')
                  .select('is_admin, membership_type, membership_expiry')
                  .eq('id', user.id)
                  .single();
                
                // Return null for admin users to filter them out
                if (adminData?.is_admin) {
                  return null;
                }
                
                return {
                  id: user.id,
                  email: user.email || '',
                  created_at: user.created_at || '',
                  membership_type: adminData?.membership_type || null,
                  membership_expiry: adminData?.membership_expiry || null
                };
              })
          );
          
          // Filter out null values (admin users)
          setUsers(nonAdminUsers.filter((user): user is User => user !== null));
        }
      } else {
        // Filter out admin users from the data
        setUsers((data || [])
          .filter((user: ApiUser) => !user.is_admin)
          .map(({ id, email, created_at, membership_type, membership_expiry }: any) => ({
            id,
            email,
            created_at,
            membership_type,
            membership_expiry
          }))
        );
      }
    } catch (err) {
      console.error("Error in user fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  const updateMembership = async (userId: string, membershipType: string) => {
    setSubmitting(prev => ({ ...prev, [userId]: true }));
    try {
      const { error } = await supabaseClient.rpc('update_user_membership', {
        user_id: userId,
        membership_type: membershipType
      });
      
      if (error) {
        console.error("Error updating membership:", error);
        message.error("Failed to update membership status");
        return;
      }
      
      message.success("Membership status updated successfully");
      
      // Refresh user list
      fetchUsers();
    } catch (err) {
      console.error("Error updating membership:", err);
      message.error("An error occurred");
    } finally {
      setSubmitting(prev => ({ ...prev, [userId]: false }));
    }
  };

  const formatExpiryDate = (date: string | null) => {
    if (!date) return "Never Expires";
    
    const expiryDate = new Date(date);
    const now = new Date();
    
    // If expired
    if (expiryDate < now) {
      return <Tag color="red">Expired</Tag>;
    }
    
    // Format the date
    return expiryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMembershipDescription = (membershipType: string | null) => {
    if (!membershipType) return "";
    const membership = MEMBERSHIP_TYPES.find(m => m.value === membershipType);
    return membership?.description || "";
  };

  return (
    <List>
      <Table
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
      >
        <Table.Column
          dataIndex="email"
          title="Email"
          render={(value) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="membership_type"
          title="Membership Status"
          render={(value, record: User) => (
            <div>
              <Select
                style={{ width: '100%' }}
                placeholder="Select membership type"
                value={value || undefined}
                onChange={(newValue) => updateMembership(record.id, newValue)}
                loading={submitting[record.id]}
                options={MEMBERSHIP_TYPES.map(type => ({
                  value: type.value,
                  label: (
                    <Tooltip title={type.description}>
                      {type.label}
                    </Tooltip>
                  )
                }))}
              />
              {value && (
                <div style={{ marginTop: 5, fontSize: '12px', color: '#888' }}>
                  {getMembershipDescription(value)}
                </div>
              )}
            </div>
          )}
        />
        <Table.Column
          dataIndex="membership_expiry"
          title="Expiry Date"
          render={(value) => formatExpiryDate(value)}
        />
        <Table.Column
          dataIndex="created_at"
          title="Joined"
          render={(value) => <DateField value={value} format="LLL" />}
        />
      </Table>
    </List>
  );
}; 