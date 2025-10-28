/**
 * Basket Utilities
 * Helper functions for managing the shopping basket
 */

export interface BasketItem {
  id: string;
  listingId: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  isInstantBuy: boolean;
  tierId?: string;
  tierName?: string;
  deliveryTime?: string;
}

const BASKET_KEY = 'whispr_basket';

/**
 * Get all items in the basket
 */
export function getBasketItems(): BasketItem[] {
  try {
    const savedBasket = localStorage.getItem(BASKET_KEY);
    return savedBasket ? JSON.parse(savedBasket) : [];
  } catch (error) {
    console.error('Error loading basket:', error);
    return [];
  }
}

/**
 * Add an item to the basket
 */
export function addToBasket(item: BasketItem): void {
  try {
    const currentBasket = getBasketItems();
    
    // Check if item already exists
    const existingItemIndex = currentBasket.findIndex(
      (i) => i.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      currentBasket[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      currentBasket.push(item);
    }

    localStorage.setItem(BASKET_KEY, JSON.stringify(currentBasket));
  } catch (error) {
    console.error('Error adding to basket:', error);
    throw error;
  }
}

/**
 * Remove an item from the basket
 */
export function removeFromBasket(itemId: string): void {
  try {
    const currentBasket = getBasketItems();
    const updatedBasket = currentBasket.filter((item) => item.id !== itemId);
    localStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
  } catch (error) {
    console.error('Error removing from basket:', error);
    throw error;
  }
}

/**
 * Update item quantity in the basket
 */
export function updateBasketItemQuantity(itemId: string, quantity: number): void {
  try {
    const currentBasket = getBasketItems();
    const updatedBasket = currentBasket.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    localStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
  } catch (error) {
    console.error('Error updating basket quantity:', error);
    throw error;
  }
}

/**
 * Clear the entire basket
 */
export function clearBasket(): void {
  try {
    localStorage.removeItem(BASKET_KEY);
  } catch (error) {
    console.error('Error clearing basket:', error);
    throw error;
  }
}

/**
 * Get the total number of items in the basket
 */
export function getBasketCount(): number {
  const items = getBasketItems();
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get the total price of all items in the basket
 */
export function getBasketTotal(): number {
  const items = getBasketItems();
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Check if an item is in the basket
 */
export function isInBasket(itemId: string): boolean {
  const items = getBasketItems();
  return items.some((item) => item.id === itemId);
}

