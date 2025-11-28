import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Design System Style Guide</h1>
          <p className="text-muted-foreground">Restaurant Order Management System</p>
        </div>

        <Separator />

        {/* Color Palette */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Primary</CardTitle>
                <CardDescription>Main brand colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-md"></div>
                  <p className="text-sm font-mono">--primary</p>
                  <p className="text-xs text-muted-foreground">Primary brand color</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-primary-foreground rounded-md border"></div>
                  <p className="text-sm font-mono">--primary-foreground</p>
                  <p className="text-xs text-muted-foreground">Text on primary</p>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Secondary</CardTitle>
                <CardDescription>Supporting colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-secondary rounded-md"></div>
                  <p className="text-sm font-mono">--secondary</p>
                  <p className="text-xs text-muted-foreground">Secondary color</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-secondary-foreground rounded-md"></div>
                  <p className="text-sm font-mono">--secondary-foreground</p>
                  <p className="text-xs text-muted-foreground">Text on secondary</p>
                </div>
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Accent</CardTitle>
                <CardDescription>Highlight colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-accent rounded-md"></div>
                  <p className="text-sm font-mono">--accent</p>
                  <p className="text-xs text-muted-foreground">Accent color</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-accent-foreground rounded-md"></div>
                  <p className="text-sm font-mono">--accent-foreground</p>
                  <p className="text-xs text-muted-foreground">Text on accent</p>
                </div>
              </CardContent>
            </Card>

            {/* Destructive */}
            <Card>
              <CardHeader>
                <CardTitle>Destructive</CardTitle>
                <CardDescription>Error & warning states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-destructive rounded-md"></div>
                  <p className="text-sm font-mono">--destructive</p>
                  <p className="text-xs text-muted-foreground">Error/destructive actions</p>
                </div>
              </CardContent>
            </Card>

            {/* Muted */}
            <Card>
              <CardHeader>
                <CardTitle>Muted</CardTitle>
                <CardDescription>Subtle backgrounds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-muted rounded-md"></div>
                  <p className="text-sm font-mono">--muted</p>
                  <p className="text-xs text-muted-foreground">Muted background</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-muted-foreground rounded-md"></div>
                  <p className="text-sm font-mono">--muted-foreground</p>
                  <p className="text-xs text-muted-foreground">Muted text</p>
                </div>
              </CardContent>
            </Card>

            {/* Base Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Base</CardTitle>
                <CardDescription>Background & foreground</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-20 bg-background rounded-md border"></div>
                  <p className="text-sm font-mono">--background</p>
                  <p className="text-xs text-muted-foreground">Page background</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-foreground rounded-md"></div>
                  <p className="text-sm font-mono">--foreground</p>
                  <p className="text-xs text-muted-foreground">Primary text color</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Typography */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground font-mono">text-4xl font-bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2</h2>
                <p className="text-sm text-muted-foreground font-mono">text-3xl font-bold</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <p className="text-sm text-muted-foreground font-mono">text-2xl font-semibold</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Heading 4</h4>
                <p className="text-sm text-muted-foreground font-mono">text-xl font-semibold</p>
              </div>
              <div>
                <p className="text-base">Body text - The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-muted-foreground font-mono">text-base</p>
              </div>
              <div>
                <p className="text-sm">Small text - The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-muted-foreground font-mono">text-sm</p>
              </div>
              <div>
                <p className="text-xs">Extra small text - The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-muted-foreground font-mono">text-xs</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Buttons */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Form Elements */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Form Elements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Input</Label>
                  <Input placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label>Disabled Input</Label>
                  <Input placeholder="Disabled" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Textarea</Label>
                  <Textarea placeholder="Enter longer text..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toggles & Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Switch</Label>
                </div>
                <div className="space-y-2">
                  <Label>Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Badges */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Badges</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Progress */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Progress</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>25% Complete</Label>
                <Progress value={25} />
              </div>
              <div className="space-y-2">
                <Label>50% Complete</Label>
                <Progress value={50} />
              </div>
              <div className="space-y-2">
                <Label>75% Complete</Label>
                <Progress value={75} />
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Alerts */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This is an informational alert message.</AlertDescription>
            </Alert>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Operation completed successfully.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>There was an error processing your request.</AlertDescription>
            </Alert>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Please review before proceeding.</AlertDescription>
            </Alert>
          </div>
        </section>

        <Separator />

        {/* Cards */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card content area with some example text.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">More card content here.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Simple card layout.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Tabs */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Tabs</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <p className="text-sm text-muted-foreground">Content for Tab 1</p>
                </TabsContent>
                <TabsContent value="tab2">
                  <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                </TabsContent>
                <TabsContent value="tab3">
                  <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Spacing Scale */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Spacing Scale</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[1, 2, 4, 6, 8, 12, 16, 24, 32].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-mono">{size * 4}px</div>
                    <div className={`h-8 bg-primary`} style={{ width: `${size * 4}px` }}></div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {size === 1 ? 'px' : `${size}`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Border Radius */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Border Radius</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-sm"></div>
                  <p className="text-sm font-mono">rounded-sm</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-md"></div>
                  <p className="text-sm font-mono">rounded-md</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-lg"></div>
                  <p className="text-sm font-mono">rounded-lg</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-full"></div>
                  <p className="text-sm font-mono">rounded-full</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
