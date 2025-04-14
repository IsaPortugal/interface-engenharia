
import React, { useState } from 'react';
import { Image as ImageIcon, Filter, Plus, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Sample gallery images data
const galleryData = [
  { id: 1, title: 'Edificação Central', category: 'Edifícios', date: '12/06/2023', thumbnail: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=2671&auto=format&fit=crop' },
  { id: 2, title: 'Terreno Aquisição Norte', category: 'Terrenos', date: '03/05/2023', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2671&auto=format&fit=crop' },
  { id: 3, title: 'Estrutura Metálica', category: 'Edifícios', date: '23/04/2023', thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop' },
  { id: 4, title: 'Casa Modelo Sul', category: 'Casas', date: '18/03/2023', thumbnail: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2670&auto=format&fit=crop' },
  { id: 5, title: 'Construtora ABC', category: 'Empresas', date: '05/02/2023', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop' },
  { id: 6, title: 'Condomínio Oeste', category: 'Edifícios', date: '29/01/2023', thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2669&auto=format&fit=crop' },
  { id: 7, title: 'Terreno Principal', category: 'Terrenos', date: '14/12/2022', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2671&auto=format&fit=crop' },
  { id: 8, title: 'Empreendimento Águas', category: 'Empresas', date: '07/11/2022', thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop' },
  { id: 9, title: 'Casa de Praia', category: 'Casas', date: '22/10/2022', thumbnail: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2680&auto=format&fit=crop' },
];

// Gallery categories for filtering
const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'buildings', label: 'Edifícios' },
  { id: 'lands', label: 'Terrenos' },
  { id: 'houses', label: 'Casas' },
  { id: 'companies', label: 'Empresas' }
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
      return;
    }
    
    // If 'all' is currently selected and we're selecting another category
    if (selectedCategories.includes('all')) {
      setSelectedCategories([categoryId]);
      return;
    }
    
    // Toggle category selection
    if (selectedCategories.includes(categoryId)) {
      const newCategories = selectedCategories.filter(id => id !== categoryId);
      setSelectedCategories(newCategories.length ? newCategories : ['all']);
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'Edifícios': return 'buildings';
      case 'Terrenos': return 'lands';
      case 'Casas': return 'houses';
      case 'Empresas': return 'companies';
      default: return 'all';
    }
  };

  const filteredGallery = galleryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryId = getCategoryLabel(item.category);
    const matchesCategory = selectedCategories.includes('all') || selectedCategories.includes(categoryId);
    return matchesSearch && matchesCategory;
  });

  // Adicionar manipulação de erro para imagens
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <ImageIcon className="mr-2 h-6 w-6 text-primary" />
            Galeria de Imagens
          </h1>
          <p className="text-muted-foreground">Visualize e gerencie as imagens dos projetos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Imagens
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 mb-6">
        {/* Sidebar filters */}
        <Card className="bg-white shadow-sm h-fit">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center">
              <Filter className="mr-2 h-4 w-4 text-primary" /> Filtros
            </h2>
            
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar imagens por nome..."
                className="pl-8 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="font-medium mb-3">Categorias</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category.id} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <Card key={item.id} className="overflow-hidden card-hover cursor-pointer shadow-md border-none">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white truncate">{item.title}</h3>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-primary/80 hover:bg-primary text-white">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-white/80 ml-2">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <Tag className="absolute top-3 right-3 h-4 w-4 text-white" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-2 opacity-40" />
                <h3 className="font-medium text-lg">Nenhuma imagem encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros ou adicione novas imagens.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
