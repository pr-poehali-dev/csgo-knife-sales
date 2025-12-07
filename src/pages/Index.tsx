import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const knives: KnifeItem[] = [
    { id: 1, name: 'Karambit Fade', type: 'Karambit', quality: 'Factory New', price: 45000, isNew: true, image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop' },
    { id: 2, name: 'M9 Bayonet Doppler', type: 'M9 Bayonet', quality: 'Minimal Wear', price: 32000, isNew: true, image: 'https://images.unsplash.com/photo-1566064352835-7c7c6c1e4dcb?w=400&h=300&fit=crop' },
    { id: 3, name: 'Butterfly Knife Tiger Tooth', type: 'Butterfly', quality: 'Factory New', price: 38000, isNew: false, image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop' },
    { id: 4, name: 'Gut Knife Gamma Doppler', type: 'Gut Knife', quality: 'Factory New', price: 15000, isNew: true, image: 'https://images.unsplash.com/photo-1593500183151-ab97013ba6d9?w=400&h=300&fit=crop' },
    { id: 5, name: 'Shadow Daggers Rust Coat', type: 'Shadow Daggers', quality: 'Battle-Scarred', price: 3500, isNew: false, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop' },
    { id: 6, name: 'Falchion Knife Safari Mesh', type: 'Falchion', quality: 'Field-Tested', price: 2800, isNew: false, image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&sat=-50' },
    { id: 7, name: 'Navaja Knife Boreal Forest', type: 'Navaja', quality: 'Well-Worn', price: 1900, isNew: false, image: 'https://images.unsplash.com/photo-1566064352835-7c7c6c1e4dcb?w=400&h=300&fit=crop&brightness=-20' },
    { id: 8, name: 'Gut Knife Urban Masked', type: 'Gut Knife', quality: 'Battle-Scarred', price: 2200, isNew: false, image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop&contrast=1.2' },
    { id: 9, name: 'Bayonet Autotronic', type: 'Bayonet', quality: 'Factory New', price: 28000, isNew: false, image: 'https://images.unsplash.com/photo-1593500183151-ab97013ba6d9?w=400&h=300&fit=crop&hue=180' },
    { id: 10, name: 'Bowie Knife Stained', type: 'Bowie', quality: 'Minimal Wear', price: 4500, isNew: false, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop&sepia=30' },
    { id: 11, name: 'Stiletto Knife Night Stripe', type: 'Stiletto', quality: 'Field-Tested', price: 5200, isNew: true, image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop&hue=240' },
    { id: 12, name: 'Classic Knife Forest DDPAT', type: 'Classic', quality: 'Well-Worn', price: 1500, isNew: false, image: 'https://images.unsplash.com/photo-1566064352835-7c7c6c1e4dcb?w=400&h=300&fit=crop&sepia=50' },
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
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
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
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                    >
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

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-lg bg-card border-primary/30 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="CreditCard" size={24} className="text-primary" />
                  Оформление заказа
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Package" size={18} className="text-accent" />
                    Ваш заказ
                  </h4>
                  <div className="bg-background rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-semibold">{item.price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span>Итого:</span>
                      <span className="text-primary text-lg">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Wallet" size={18} className="text-secondary" />
                    Способ оплаты
                  </h4>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 bg-background rounded-lg p-4 border-2 border-transparent hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Icon name="CreditCard" size={20} className="text-primary" />
                          <div>
                            <div className="font-semibold">Банковская карта</div>
                            <div className="text-xs text-muted-foreground">Visa, MasterCard, МИР</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 bg-background rounded-lg p-4 border-2 border-transparent hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Icon name="Bitcoin" size={20} className="text-accent" />
                          <div>
                            <div className="font-semibold">Криптовалюта</div>
                            <div className="text-xs text-muted-foreground">BTC, ETH, USDT</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 bg-background rounded-lg p-4 border-2 border-transparent hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="steam" id="steam" />
                        <Label htmlFor="steam" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Icon name="Gamepad2" size={20} className="text-secondary" />
                          <div>
                            <div className="font-semibold">Steam скины</div>
                            <div className="text-xs text-muted-foreground">Обмен на скины из Steam</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 bg-background rounded-lg p-4 border-2 border-transparent hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <Label htmlFor="sbp" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Icon name="Smartphone" size={20} className="text-primary" />
                          <div>
                            <div className="font-semibold">СБП (Система быстрых платежей)</div>
                            <div className="text-xs text-muted-foreground">Оплата по номеру телефона</div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg h-12"
                  onClick={() => {
                    if (paymentMethod === 'sbp') {
                      const phone = '79822141678';
                      const amount = getTotalPrice();
                      const sbpUrl = `https://qr.nspk.ru/AS10003DKT0EJMK25O47N02GTE3V64QC?type=02&bank=100000000111&sum=${amount}&cur=RUB&payeeId=${phone}&phone=${phone}`;
                      window.open(sbpUrl, '_blank');
                      alert(`Переход на оплату ${amount.toLocaleString('ru-RU')} ₽ через СБП на номер +7 (982) 214-16-78`);
                    } else {
                      alert(`Заказ оформлен! Способ оплаты: ${paymentMethod === 'card' ? 'Банковская карта' : paymentMethod === 'crypto' ? 'Криптовалюта' : 'Steam скины'}. Сумма: ${getTotalPrice().toLocaleString('ru-RU')} ₽`);
                    }
                    setIsCheckoutOpen(false);
                    setCartItems([]);
                    setCartCount(0);
                  }}
                >
                  <Icon name="Check" size={20} className="mr-2" />
                  Оплатить {getTotalPrice().toLocaleString('ru-RU')} ₽
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;