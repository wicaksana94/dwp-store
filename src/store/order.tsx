import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HourOption {
  day: string;
  hour_start: string;
  hour_end: string;
}

interface CouponProps {
  coupon_id: string;
  discount: number;
  discount_type: string;
}

interface Order {
  id: string;
  class_detail_id: number;
  display_product_name: string;
  invoice_url?: string;
  coupon_properties?: CouponProps;
  image_path?: string;
  product_price: number;
  external_id: string;
  properties: {
    benefits: string[];
    category_id: number;
    category_name: string;
    class_meet_set_id: number;
    class_meet_set_name: string;
    class_meet_set_number_of_meeting: number;
    class_meet_set_max_day_duration: number;
    class_type_id: number;
    class_type_name: string;
    gender_tutor: string;
    hari_jam: string[];
    language_icon: string;
    language_id: number;
    language_name: string;
    learning_frequency_in_aweek: string;
    program_description: string;
    program_id: number;
    program_name: string;
    image_path: string;
    features: string[];
    questioners: string[];
    sylabus: string[];
    student_availability: Array<HourOption>;
    coupon_nominal: number;
    discount_nominal: number;
    price_after_coupon: number;
    price_before_coupon: number;
  };
  status: string;
  created_at: string;
  expired_at: string;
  is_clicked: boolean;
}

type OrderStore = {
  selectedOrder: Order;
  orderList: Order[];
  orderStep: number;
  setOrderStep: (data: number) => void;
  setSelectedOrder: (data: Order) => void;
  setOrderList: (data: Order[]) => void;
  emptyOrderList: () => void;
};

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      selectedOrder: {} as Order,
      orderList: [],
      orderStep: 0,
      setOrderStep: (data) => set(() => ({ orderStep: data })),
      setSelectedOrder: (data) => set(() => ({ selectedOrder: data })),
      setOrderList: (data) => set(() => ({ orderList: data })),
      emptyOrderList: () => set(() => ({ orderList: [] })),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
