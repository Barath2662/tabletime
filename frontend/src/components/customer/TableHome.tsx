import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Clock, Award } from "lucide-react";

interface TableHomeProps {
  tableNumber: string;
}

const TableHome = ({ tableNumber }: TableHomeProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Our Restaurant!</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            You're seated at Table {tableNumber}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">
            Browse our delicious menu, place your order, and track it in real-time. Enjoy your meal!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Fresh Food</CardTitle>
              <CardDescription>Made with love</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-lg">Quick Service</CardTitle>
              <CardDescription>Track your order</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Quality Food</CardTitle>
              <CardDescription>Best ingredients</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-semibold">Browse Menu</p>
              <p className="text-sm text-muted-foreground">
                Explore our delicious offerings in the Menu tab
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-semibold">Add to Cart</p>
              <p className="text-sm text-muted-foreground">
                Select items and quantities
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-semibold">Confirm Order</p>
              <p className="text-sm text-muted-foreground">
                Provide your name and phone number
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <p className="font-semibold">Track & Enjoy</p>
              <p className="text-sm text-muted-foreground">
                Monitor your order status and enjoy your meal!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableHome;
