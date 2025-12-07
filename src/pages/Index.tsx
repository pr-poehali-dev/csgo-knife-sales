import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface KnifeItem {
  id: number;
  name: string;
  type: string;
  quality: string;
  price: number;
  isNew: boolean;
  image: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<KnifeItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const knives: KnifeItem[] = [
    { id: 1, name: 'Karambit Fade', type: 'Karambit', quality: 'Factory New', price: 45000, isNew: true, image: '/placeholder.svg' },
    { id: 2, name: 'M9 Bayonet Doppler', type: 'M9 Bayonet', quality: 'Minimal Wear', price: 32000, isNew: true, image: '/placeholder.svg' },
    { id: 3, name: 'Butterfly Knife Tiger Tooth', type: 'Butterfly', quality: 'Factory New', price: 38000, isNew: false, image: '/placeholder.svg' },
    { id: 4, name: 'Gut Knife Gamma Doppler', type: 'Gut Knife', quality: 'Factory New', price: 15000, isNew: true, image: '/placeholder.svg' },
    { id: 5, name: 'Ursus Knife Slaughter', type: 'Ursus', quality: 'Field-Tested', price: 18000, isNew: false, image: '/placeholder.svg' },
    { id: 6, name: 'Talon Knife Crimson Web', type: 'Talon', quality: 'Minimal Wear', price: 52000, isNew: false, image: '/placeholder.svg' },
    { id: 7, name: 'Bayonet Autotronic', type: 'Bayonet', quality: 'Factory New', price: 28000, isNew: false, image: '/placeholder.svg' },
    { id: 8, name: 'Nomad Knife Blue Steel', type: 'Nomad', quality: 'Well-Worn', price: 12000, isNew: false, image: '/placeholder.svg' },
  ];

  const addToCart = (knife: KnifeItem) => {
    setCartItems([...cartItems, knife]);
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (id: number) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    setCartCount(cartCount - 1);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  };

  const filteredKnives = knives.filter(knife =>
    knife.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    knife.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newKnives = knives.filter(knife => knife.isNew);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔪</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">CS:GO 2 KNIVES</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="relative border-primary/50 hover:bg-primary/10"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent animate-pulse-glow">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-8 py-8">
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border border-primary/30">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-effect">
                Редкие ножи CS:GO 2
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Эксклюзивные скины от проверенных продавцов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <div className="relative flex-1">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию или типу оружия..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  <Icon name="Filter" size={20} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
          </div>
        </section>

        {searchQuery === '' && (
          <section className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Sparkles" size={24} className="text-accent" />
              <h3 className="text-2xl font-bold">Новинки</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newKnives.map((knife) => (
                <Card key={knife.id} className="group bg-card border-primary/20 hover-glow overflow-hidden animate-scale-in">
                  <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground animate-pulse-glow">
                      НОВИНКА
                    </Badge>
                    <img
                      src={knife.image}
                      alt={knife.name}
                      className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg mb-1">{knife.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{knife.quality}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {knife.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(knife)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Icon name="ShoppingBag" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Package" size={24} className="text-primary" />
            <h3 className="text-2xl font-bold">Каталог</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredKnives.map((knife, index) => (
              <Card
                key={knife.id}
                className="group bg-card border-primary/20 hover-glow overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                  <img
                    src={knife.image}
                    alt={knife.name}
                    className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {knife.type}
                  </Badge>
                  <h4 className="font-bold text-lg mb-1">{knife.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{knife.quality}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {knife.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(knife)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Icon name="ShoppingBag" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-card border border-primary/20 rounded-2xl p-8 md:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Контакты</h3>
              <p className="text-muted-foreground mb-4">Свяжитесь с нами для консультации</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} className="text-primary" />
                  <span>support@csgo-knives.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={18} className="text-secondary" />
                  <span>Telegram: @csgo_knives_support</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Icon name="Send" size={20} className="mr-2" />
              Написать нам
            </Button>
          </div>
        </section>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md bg-card border-primary/30 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} className="text-primary" />
                  Корзина
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Корзина пустая</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-3 bg-background rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-primary font-bold">{item.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold text-primary">
                        {getTotalPrice().toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
