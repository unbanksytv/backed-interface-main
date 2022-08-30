import styles from './AdvancedSearch.module.css';
import { Input } from 'components/Input';
import { ChangeEvent, useCallback, useState } from 'react';

type CollateralSearchInputProps = {
  collectionAddress: string;
  collectionName: string;
  setCollectionAddress: (address: string) => void;
  setCollectionName: (name: string) => void;
};

export default function CollateralSearchInput({
  setCollectionAddress,
  setCollectionName,
}: CollateralSearchInputProps) {
  const [error, setError] = useState('');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.trim();

      if (newValue.length < 3) {
        setCollectionName('');
        setCollectionAddress('');
      } else {
        if (newValue.substring(0, 2) == '0x') {
          if (newValue.length % 2 !== 0) {
            setError('Invalid address inputted');
            return;
          }
          setCollectionAddress(newValue);
          setCollectionName('');
        } else {
          setCollectionName(newValue.toLowerCase());
          setCollectionAddress('');
        }
      }
    },
    [setCollectionAddress, setCollectionName],
  );

  return (
    <div className={styles.inputWrapper}>
      <span>Collection</span>
      <div className={styles.inputGroup}>
        <label>
          <Input onChange={handleChange} placeholder="Enter collection" />
        </label>
      </div>
      {error && <div className={styles.errors}>{error}</div>}
    </div>
  );
}
