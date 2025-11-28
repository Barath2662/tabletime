import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ChefHat, Utensils, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto p-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Restaurant Order Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern dine-in ordering system with real-time kitchen and server coordination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="hover:shadow-xl transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Customer Portal</CardTitle>
              <CardDescription>
                Browse menu, place orders, and track your food in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Select your table number to get started:
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Link key={num} to={`/table/${num}`}>
                    <Button variant="outline" className="w-full">
                      {num}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="hover:shadow-xl transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                  <ChefHat className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle>Kitchen Display</CardTitle>
                <CardDescription>
                  View and manage incoming orders from all tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Staff Login - Kitchen
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                  <Utensils className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Server Portal</CardTitle>
                <CardDescription>
                  Track prepared orders ready to serve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button variant="secondary" className="w-full">
                    Staff Login - Server
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <LayoutDashboard className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Complete overview of orders, tables, and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Staff Login - Admin
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-semibold">Customer Orders</h3>
              <p className="text-sm text-muted-foreground">
                Browse menu and place orders from table
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-semibold">Kitchen Prepares</h3>
              <p className="text-sm text-muted-foreground">
                Chefs see orders and mark when ready
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-full text-secondary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-semibold">Server Delivers</h3>
              <p className="text-sm text-muted-foreground">
                Staff serves food to correct table
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent rounded-full text-accent-foreground flex items-center justify-center text-xl font-bold mx-auto">
                4
              </div>
              <h3 className="font-semibold">Customer Enjoys</h3>
              <p className="text-sm text-muted-foreground">
                Track status and request bill
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
