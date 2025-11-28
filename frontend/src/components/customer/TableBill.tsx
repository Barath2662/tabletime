import { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_name: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
  menu_items: {
    name: string;
    price: number;
  };
}

interface TableBillProps {
  tableNumber: string;
}

const TableBill = ({ tableNumber }: TableBillProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [tableNumber]);

  const fetchOrders = async () => {
    try {
      const allOrders = await apiClient.getOrdersByTableNumber(parseInt(tableNumber));
      const activeOrders = allOrders.filter((order: Order) => order.status !== 'completed');
      setOrders(activeOrders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBill = async () => {
    toast.success("Bill requested! Our staff will be with you shortly.");
  };

  const totalAmount = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const taxAmount = totalAmount * 0.1; // 10% tax
  const grandTotal = totalAmount + taxAmount;

  if (loading) {
    return <div className="text-center p-8">Loading bill...</div>;
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Receipt className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No active orders. Place an order to see your bill here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Your Bill
          </CardTitle>
          <CardDescription>Table {tableNumber}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Order #{order.id.slice(0, 8)}</span>
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">x{item.quantity}</span>
                      <span>{item.menu_items.name}</span>
                    </div>
                    <span className="font-medium">
                      ₹{(item.menu_items.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          ))}

          <div className="space-y-2 pt-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (10%)</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-2xl font-bold pt-2">
              <span>Total</span>
              <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            size="lg"
            onClick={handleRequestBill}
          >
            Request Bill & Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableBill;
