
import React from 'react';
import { Image as ImageIcon, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample gallery images data
const galleryData = [
  { id: 1, title: 'Edificação Central', category: 'Edifícios', date: '12/06/2023', thumbnail: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=2671&auto=format&fit=crop' },
  { id: 2, title: 'Fundação Norte', category: 'Fundações', date: '03/05/2023', thumbnail: 'https://images.unsplash.com/photo-1562648171-fd627bc3eb6c?q=80&w=2670&auto=format&fit=crop' },
  { id: 3, title: 'Estrutura Metálica', category: 'Estruturas', date: '23/04/2023', thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop' },
  { id: 4, title: 'Acabamento Sul', category: 'Acabamentos', date: '18/03/2023', thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop' },
  { id: 5, title: 'Instalações Elétricas', category: 'Instalações', date: '05/02/2023', thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2569&auto=format&fit=crop' },
  { id: 6, title: 'Pavimentação Oeste', category: 'Pavimentação', date: '29/01/2023', thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2669&auto=format&fit=crop' },
  { id: 7, title: 'Drenagem Principal', category: 'Drenagem', date: '14/12/2022', thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop' },
  { id: 8, title: 'Terraplanagem', category: 'Terraplanagem', date: '07/11/2022', thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop' },
];

// Gallery categories for filtering
const categories = [
  'Todas', 'Edifícios', 'Fundações', 'Estruturas', 'Acabamentos', 
  'Instalações', 'Pavimentação', 'Drenagem', 'Terraplanagem'
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Todas');

  const filteredGallery = galleryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-6 max-w-7xl animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <ImageIcon className="mr-2 h-6 w-6 text-vpro-orange" />
            Galeria de Imagens
          </h1>
          <p className="text-muted-foreground">Visualize e gerencie as imagens dos projetos</p>
        </div>
        <Button className="bg-vpro-orange hover:bg-orange-500 text-white">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Imagens
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 mb-6">
        {/* Sidebar filters */}
        <Card className="bg-white shadow-sm h-fit">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center">
              <Filter className="mr-2 h-4 w-4 text-vpro-yellow" /> Filtros
            </h2>
            
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar imagens..."
                className="pl-8 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="font-medium mb-2">Categorias</h3>
              <ScrollArea className="h-[220px]">
                <div className="space-y-1 pr-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start text-left font-normal ${
                        selectedCategory === category 
                          ? "bg-vpro-blue text-white" 
                          : "hover:bg-vpro-green/20 hover:text-vpro-blue"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Gallery grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.length > 0 ? (
              filteredGallery.map((item) => (
                <Card key={item.id} className="overflow-hidden card-hover cursor-pointer">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <span className="text-xs text-white font-medium bg-vpro-yellow text-black px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 text-gray-800 truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Data: {item.date}
                    </p>
                  </CardContent>
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
