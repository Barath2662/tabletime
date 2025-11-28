import { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Utensils, CheckCircle2 } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
  status: string;
  menu_items: {
    name: string;
    price: number;
  };
}

interface TableOrdersProps {
  tableNumber: string;
}

const statusConfig = {
  pending: { icon: Clock, label: "Order Received", color: "bg-yellow-500" },
  preparing: { icon: ChefHat, label: "Being Prepared", color: "bg-blue-500" },
  prepared: { icon: Utensils, label: "Ready to Serve", color: "bg-purple-500" },
  served: { icon: CheckCircle2, label: "Served", color: "bg-green-500" },
};

const TableOrders = ({ tableNumber }: TableOrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    
    // Set up WebSocket for real-time updates
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
  }, [tableNumber]);

  const fetchOrders = async () => {
    try {
      const data = await apiClient.getOrdersByTableNumber(parseInt(tableNumber));
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No orders yet. Start by ordering from the menu!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
        const StatusIcon = statusInfo.icon;

        return (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Order #{order.id.slice(0, 8)}
                    <Badge className={`${statusInfo.color} text-white`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {new Date(order.created_at).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">₹{order.total_amount.toFixed(2)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.order_items.map((item) => {
                  const itemStatusInfo = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.pending;
                  const ItemStatusIcon = itemStatusInfo.icon;
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${itemStatusInfo.color}`} />
                        <div>
                          <p className="font-medium">{item.menu_items.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <ItemStatusIcon className="w-3 h-3" />
                        {itemStatusInfo.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TableOrders;
