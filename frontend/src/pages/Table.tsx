import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home as HomeIcon, UtensilsCrossed, ClipboardList, Receipt } from "lucide-react";
import TableHome from "@/components/customer/TableHome";
import TableMenu from "@/components/customer/TableMenu";
import TableOrders from "@/components/customer/TableOrders";
import TableBill from "@/components/customer/TableBill";

const Table = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Table {tableNumber}</h1>
          <p className="text-sm opacity-90">Welcome to our restaurant!</p>
        </div>
      </header>

      <div className="container mx-auto p-4 pb-20">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="home" className="flex flex-col gap-1">
              <HomeIcon className="w-4 h-4" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex flex-col gap-1">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="text-xs">Menu</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex flex-col gap-1">
              <ClipboardList className="w-4 h-4" />
              <span className="text-xs">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="bill" className="flex flex-col gap-1">
              <Receipt className="w-4 h-4" />
              <span className="text-xs">Bill</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <TableHome tableNumber={tableNumber || "1"} />
          </TabsContent>

          <TabsContent value="menu">
            <TableMenu tableNumber={tableNumber || "1"} />
          </TabsContent>

          <TabsContent value="orders">
            <TableOrders tableNumber={tableNumber || "1"} />
          </TabsContent>

          <TabsContent value="bill">
            <TableBill tableNumber={tableNumber || "1"} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Table;
