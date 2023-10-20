export interface IGifObject {
  id: string;
  alt_text?: string;
  title: string;
  import_datetime: string;
  user?: {
    avatar_url: string;
    display_name: string;
  };
  images: {
    fixed_width: {
      webp: string;
      height: string;
    };
    fixed_width_small: {
      webp: string;
      height: string;
      width: string;
    };
    original: {
      url: string;
      webp: string;
      height: string;
      width: string;
    };
  };
  source_tld: string;
  source: string;
  liked?: boolean;
}
