'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

// Define color categories
const colorCategories = [
  {
    name: 'Primary Colors',
    colors: ['primary', 'primary-foreground'],
  },
  {
    name: 'Background & Surface',
    colors: ['background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground'],
  },
  {
    name: 'Secondary Colors',
    colors: ['secondary', 'secondary-foreground', 'muted', 'muted-foreground', 'accent', 'accent-foreground'],
  },
  {
    name: 'Semantic Colors',
    colors: ['destructive', 'destructive-foreground', 'border', 'input', 'ring'],
  },
  {
    name: 'Sidebar Colors',
    colors: [
      'sidebar-background',
      'sidebar-foreground',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-accent',
      'sidebar-accent-foreground',
      'sidebar-border',
      'sidebar-ring',
    ],
  },
  {
    name: 'Charts',
    colors: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
  },
];

// Typography scale
const typographyScale = [
  { name: 'Display Large', className: 'text-5xl font-bold tracking-tight' },
  { name: 'Display Small', className: 'text-4xl font-bold tracking-tight' },
  { name: 'Heading 1', className: 'text-3xl font-bold tracking-tight' },
  { name: 'Heading 2', className: 'text-2xl font-semibold tracking-tight' },
  { name: 'Heading 3', className: 'text-xl font-semibold' },
  { name: 'Body Large', className: 'text-lg' },
  { name: 'Body', className: 'text-base' },
  { name: 'Body Small', className: 'text-sm' },
  { name: 'Caption', className: 'text-xs text-muted-foreground' },
];

export default function StyleGuide() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customVars, setCustomVars] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('colors');

  // Toggle dark mode
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setIsDarkMode(!isDarkMode);
  };

  // Update CSS variable
  const updateCssVar = (varName: string, value: string) => {
    document.documentElement.style.setProperty(`--${varName}`, value);
    setCustomVars(prev => ({
      ...prev,
      [varName]: value,
    }));
  };

  // Reset all customizations
  const resetCustomizations = () => {
    Object.keys(customVars).forEach(varName => {
      document.documentElement.style.removeProperty(`--${varName}`);
    });
    setCustomVars({});
  };

  // Get current value of a CSS variable
  const getCssVarValue = (varName: string) => {
    if (customVars[varName]) return customVars[varName];
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--${varName}`)
      .trim();
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Dark Mode</span>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>
          {Object.keys(customVars).length > 0 && (
            <Button variant="outline" onClick={resetCustomizations}>
              Reset Customizations
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-8">
          {colorCategories.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.colors.map((color) => {
                    const varName = color;
                    const currentValue = getCssVarValue(varName);
                    
                    return (
                      <div key={color} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={color} className="text-sm font-medium">
                            {color}
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {currentValue}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div 
                            className={cn(
                              'w-10 h-10 rounded-md border',
                              color.includes('background') || color.includes('card') || color.includes('popover') || color === 'primary-foreground' || color === 'sidebar-primary-foreground' || color === 'sidebar-accent-foreground' || color === 'sidebar-foreground'
                                ? 'bg-background' 
                                : 'bg-foreground'
                            )}
                            style={{
                              backgroundColor: `hsl(var(--${varName}) / 1)`,
                            }}
                          />
                          <Input
                            id={color}
                            value={currentValue}
                            onChange={(e) => updateCssVar(varName, e.target.value)}
                            className="h-10"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="typography" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Type Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {typographyScale.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                    <div className={item.className}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {item.className}
                    </div>
                    <div className="h-px bg-border my-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black'].map((weight) => (
                  <div key={weight} className="space-y-2">
                    <div className="text-sm text-muted-foreground">{weight.replace('font-', '')}</div>
                    <div className={cn('text-lg', weight)}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="h-px bg-border my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
