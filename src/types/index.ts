export interface Toy {
  id: string;
  name: string;
  nameEn?: string;
  brand: string;
  series: string;
  year: number;
  origin: string; // 产地
  material?: string; // 材质
  scale?: string; // 比例/尺寸
  condition: 'mint' | 'excellent' | 'good' | 'fair'; // 品相
  tags: string[];
  description: string;
  story?: string; // 背后的故事/公众号文章内容
  images: string[]; // 图片URL数组
  wechatArticleUrl?: string; // 对应公众号文章链接
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo?: string;
  description: string;
  country: string;
  foundedYear?: number;
  toyCount: number;
}

export type ConditionLabel = {
  [key in Toy['condition']]: { label: string; color: string };
};
