'use client';
import { useParams } from 'next/navigation';

export default function CoinPage() {
  const { id } = useParams();

  return <div>CoinPage: {id}</div>;
}
