import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, LogOut } from "lucide-react";
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
  notes: string | null;
  menu_items: {
    name: string;
    category: string;
  };
}

const Kitchen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();

    const ws = apiClient.createWebSocket();
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'order_update' || data.type === 'order_item_update') {
        fetchOrders();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await apiClient.getOrders({ status: 'pending,preparing' });
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const markItemPrepared = async (itemId: string, orderId: string) => {
    try {
      await apiClient.updateOrderItemStatus(itemId, 'prepared', orderId);

      const order = orders.find((o) => o.id === orderId);
      const allItemsPrepared = order?.order_items.every(
        (item) => item.id === itemId || item.status === "prepared"
      );

      if (allItemsPrepared) {
        await apiClient.updateOrderStatus(orderId, 'prepared');
      }

      toast.success("Item marked as prepared");
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const startPreparingOrder = async (orderId: string) => {
    try {
      await apiClient.updateOrderStatus(orderId, 'preparing');
      toast.success("Started preparing order");
      fetchOrders();
    } catch (error) {
      console.error("Error starting preparation:", error);
      toast.error("Failed to start preparation");
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
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              Kitchen Display
            </h1>
            <p className="text-sm opacity-90">Active Orders: {orders.length}</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <ChefHat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No pending orders. Great job!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-2 border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Table {order.tables.table_number}
                    </CardTitle>
                    <Badge
                      variant={order.status === "pending" ? "secondary" : "default"}
                    >
                      {order.status === "pending" ? "New Order" : "Preparing"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
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
                        <div className="flex-1">
                          <p className="font-medium">
                            x{item.quantity} {item.menu_items.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.menu_items.category}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-orange-600 mt-1">Note: {item.notes}</p>
                          )}
                        </div>
                        {item.status === "prepared" ? (
                          <Badge className="bg-accent">Ready</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => markItemPrepared(item.id, order.id)}
                            disabled={order.status === "pending"}
                          >
                            Done
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {order.status === "pending" && (
                    <Button
                      className="w-full"
                      onClick={() => startPreparingOrder(order.id)}
                    >
                      Start Preparing
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
