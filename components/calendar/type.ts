export interface EventType {
  start_at: string;
  end_at: string;
  color: string;
  title: string;
  content: string;
  spot: {
    id: string;
    name: string;
  };
}

export interface ModalType {
  start_at: string;
  first: boolean;
  show: boolean;
  id: number;
}
