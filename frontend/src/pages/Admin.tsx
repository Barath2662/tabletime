import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, UtensilsCrossed, Receipt, Users, LogOut } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  total_amount: number;
  created_at: string;
  tables: {
    table_number: number;
  };
  order_items: OrderItem[];
}

interface OrderItem {
  quantity: number;
  menu_items: {
    name: string;
    price: number;
  };
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();

    const ws = apiClient.createWebSocket();
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'order_update') {
        fetchOrders();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await apiClient.getOrders({});
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const todayOrders = orders.filter(
    (order) =>
      new Date(order.created_at).toDateString() === new Date().toDateString()
  );
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total_amount, 0);
  const activeOrders = orders.filter((order) => order.status !== "served");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "preparing": return "bg-blue-500";
      case "prepared": return "bg-purple-500";
      case "served": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6" />
              Admin Dashboard
            </h1>
            <p className="text-sm opacity-90">Restaurant Management</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Orders</CardDescription>
              <CardTitle className="text-3xl">{todayOrders.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Revenue</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                ₹{todayRevenue.toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Orders</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{activeOrders.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-3xl">{orders.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id.slice(0, 8)}
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Table {order.tables.table_number} • {order.customer_name} • {order.customer_phone}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>x{item.quantity} {item.menu_items.name}</span>
                        <span>₹{(item.menu_items.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-4">
            {activeOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id.slice(0, 8)}
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Table {order.tables.table_number} • {order.customer_name}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            {orders.filter((o) => o.status === "served").map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id.slice(0, 8)}
                        <Badge className="bg-green-500 text-white">
                          Completed
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Table {order.tables.table_number} • {order.customer_name}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
