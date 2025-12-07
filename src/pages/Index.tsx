import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Item {
  id: number;
  name: string;
  type: string;
  quality: string;
  price: number;
  isNew: boolean;
  image: string;
  category: 'knife' | 'gloves';
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'knife' | 'gloves'>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const items: Item[] = [
    { id: 1, name: 'Karambit Fade', type: 'Karambit', quality: 'Factory New', price: 45000, isNew: true, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_fade_light_large.png' },
    { id: 2, name: 'M9 Bayonet Doppler', type: 'M9 Bayonet', quality: 'Minimal Wear', price: 32000, isNew: true, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_doppler_phase2_light_large.png' },
    { id: 3, name: 'Butterfly Knife Tiger Tooth', type: 'Butterfly', quality: 'Factory New', price: 38000, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_an_tiger_orange_light_large.png' },
    { id: 4, name: 'Gut Knife Gamma Doppler', type: 'Gut Knife', quality: 'Factory New', price: 15000, isNew: true, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_gamma_doppler_phase1_light_large.png' },
    { id: 5, name: 'Shadow Daggers Rust Coat', type: 'Shadow Daggers', quality: 'Battle-Scarred', price: 3500, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_push_aq_rust_coat_light_large.png' },
    { id: 6, name: 'Falchion Knife Safari Mesh', type: 'Falchion', quality: 'Field-Tested', price: 2800, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_mesh_tan_light_large.png' },
    { id: 7, name: 'Navaja Knife Boreal Forest', type: 'Navaja', quality: 'Well-Worn', price: 1900, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_gypsy_jackknife_sp_tape_short_forest_light_large.png' },
    { id: 8, name: 'Gut Knife Urban Masked', type: 'Gut Knife', quality: 'Battle-Scarred', price: 2200, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_gut_sp_tape_urban_light_large.png' },
    { id: 9, name: 'Bayonet Autotronic', type: 'Bayonet', quality: 'Factory New', price: 28000, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_bayonet_cu_bayonet_autotronic_light_large.png' },
    { id: 10, name: 'Bowie Knife Stained', type: 'Bowie', quality: 'Minimal Wear', price: 4500, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_survival_bowie_aq_blued_light_large.png' },
    { id: 11, name: 'Stiletto Knife Night Stripe', type: 'Stiletto', quality: 'Field-Tested', price: 5200, isNew: true, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_stiletto_sp_zebra_light_large.png' },
    { id: 12, name: 'Classic Knife Forest DDPAT', type: 'Classic', quality: 'Well-Worn', price: 1500, isNew: false, category: 'knife', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_knife_css_hy_ddpat_light_large.png' },
    { id: 13, name: 'Sport Gloves Pandora\'s Box', type: 'Sport Gloves', quality: 'Factory New', price: 18500, isNew: true, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_sporty_am_pandora_light_large.png' },
    { id: 14, name: 'Specialist Gloves Crimson Kimono', type: 'Specialist Gloves', quality: 'Minimal Wear', price: 15200, isNew: true, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_specialist_aq_kimono_light_large.png' },
    { id: 15, name: 'Driver Gloves King Snake', type: 'Driver Gloves', quality: 'Field-Tested', price: 9800, isNew: false, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_handwrap_hy_snake_light_large.png' },
    { id: 16, name: 'Hand Wraps Slaughter', type: 'Hand Wraps', quality: 'Minimal Wear', price: 12000, isNew: true, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_handwrap_aq_handwrap_slaughter_light_large.png' },
    { id: 17, name: 'Moto Gloves Spearmint', type: 'Moto Gloves', quality: 'Factory New', price: 19500, isNew: true, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_motorcycle_am_spearmint_light_large.png' },
    { id: 18, name: 'Specialist Gloves Emerald Web', type: 'Specialist Gloves', quality: 'Field-Tested', price: 8500, isNew: false, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_specialist_hy_emerald_web_light_large.png' },
    { id: 19, name: 'Sport Gloves Vice', type: 'Sport Gloves', quality: 'Minimal Wear', price: 11500, isNew: true, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_sporty_aq_vice_light_large.png' },
    { id: 20, name: 'Driver Gloves Crimson Weave', type: 'Driver Gloves', quality: 'Well-Worn', price: 6200, isNew: false, category: 'gloves', image: 'https://cdn.cloudflare.steamstatic.com/apps/730/icons/econ/default_generated/weapon_gloves_handwrap_sp_mesh_hot_and_cold_light_large.png' },
  ];

  const addToCart = (item: Item) => {
    setCartItems([...cartItems, item]);
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

  const filteredItems = items
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const newItems = items.filter(item => item.isNew);

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
                Редкие скины CS:GO 2
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Эксклюзивные ножи и перчатки от проверенных продавцов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
                <div className="relative flex-1">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию или типу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setSelectedCategory('all')}
                    className={selectedCategory === 'all' ? 'bg-primary hover:bg-primary/90' : 'bg-background/50 hover:bg-background/70 border border-primary/30'}
                  >
                    Всё
                  </Button>
                  <Button 
                    onClick={() => setSelectedCategory('knife')}
                    className={selectedCategory === 'knife' ? 'bg-primary hover:bg-primary/90' : 'bg-background/50 hover:bg-background/70 border border-primary/30'}
                  >
                    🔪 Ножи
                  </Button>
                  <Button 
                    onClick={() => setSelectedCategory('gloves')}
                    className={selectedCategory === 'gloves' ? 'bg-primary hover:bg-primary/90' : 'bg-background/50 hover:bg-background/70 border border-primary/30'}
                  >
                    🧤 Перчатки
                  </Button>
                </div>
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
              {newItems.map((item) => (
                <Card key={item.id} className="group bg-card border-primary/20 hover-glow overflow-hidden animate-scale-in">
                  <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                    <Badge className="absolute top-2 left-2 bg-secondary/80 text-secondary-foreground">
                      {item.category === 'knife' ? '🔪 Нож' : '🧤 Перчатки'}
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground animate-pulse-glow">
                      НОВИНКА
                    </Badge>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.quality}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
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
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group bg-card border-primary/20 hover-glow overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                  <Badge className="absolute top-2 left-2 bg-secondary/80 text-secondary-foreground">
                    {item.category === 'knife' ? '🔪' : '🧤'}
                  </Badge>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {item.type}
                  </Badge>
                  <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.quality}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item)}
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