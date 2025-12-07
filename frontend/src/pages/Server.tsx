import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, CheckCircle2, LogOut } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_name: string;
  status: string;
  created_at: string;
  tables: {
    table_number: number;
  };
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
  status: string;
  menu_items: {
    name: string;
  };
}

const Server = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();

    const socket = apiClient.createWebSocket();
    socket.on('order_update', () => fetchOrders());
    socket.on('order_item_update', () => fetchOrders());

    return () => {
      socket.off('order_update');
      socket.off('order_item_update');
      socket.disconnect();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await apiClient.getOrders({ status: 'prepared' });
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const markOrderServed = async (orderId: string) => {
    try {
      await apiClient.updateOrderStatus(orderId, 'served');
      toast.success("Order marked as served");
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center p-8">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Utensils className="w-6 h-6" />
              Server Dashboard
            </h1>
            <p className="text-sm opacity-90">Ready to Serve: {orders.length}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Utensils className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No orders ready to serve. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-2 border-secondary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Table {order.tables.table_number}
                    </CardTitle>
                    <Badge className="bg-purple-500">Ready</Badge>
                  </div>
                  <CardDescription>
                    {new Date(order.created_at).toLocaleTimeString()}
                  </CardDescription>
                  <p className="text-sm font-medium">Customer: {order.customer_name}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <p className="font-medium">
                            x{item.quantity} {item.menu_items.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => markOrderServed(order.id)}
                  >
                    Mark as Served
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Server;
