    // <========Logika Tambah Kolom=============>
    const dataTipePAK = { ak_dasar: data.ak_dasar, ak_jf: data.ak_jf, ak_penyesuaian: data.ak_penyesuaian,ak_konversi: data.ak_konversi, ak_peningkatan: data.ak_peningkatan,};
    const [rowKeys, setRowKeys] = useState(Object.keys(dataTipePAK));

    const handleAddRow = () => {
        const newRowKey = `ak_baru_${rowKeys.length + 1}`;

        const newData = {
            ...data,
            [newRowKey]: {
                tipe_ak: "AK Baru yang diberikan",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },
        };
        setData(newData);
        setRowKeys([...rowKeys, newRowKey]);
    };

    const handleRemoveRow = (key) => {
        const { [key]: _, ...newData } = data;
        setData(newData);
        setRowKeys(rowKeys.filter((rowKey) => rowKey !== key));
    };

    const handleChange = (key, field, value) => {
        const newData = {
            ...data,
            [key]: {
                ...data[key],
                [field]: value,
                jumlah:
                    field === "lama" || field === "baru"
                        ? (parseFloat(data[key].lama) || 0) +
                          (field === "lama"
                              ? parseFloat(value) || 0
                              : parseFloat(data[key].baru) || 0)
                        : data[key].jumlah,
            },
        };
        setData(newData);
    };













    //
      {/* Jika Kolom baru ditambahkan atau index lebih dari 4 maka muncul input text */}
      {index <= 4 ? (
        data[key].tipe_ak
    ) : (
        // Input Tipe AK Jika ditambahkan kolom baru
        <TextInput
            name={key}
            type="text"
            className="placeholder:text-accent text-center text-hijau"
            placeholder="Input Tipe AK"
            // value={data[key].tipe_ak}
            onChange={(e) =>
                handleChange(
                    key,
                    "tipe_ak",
                    e.target.value
                )
            }
        />
    )}
