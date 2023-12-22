import { SectionProduct } from '../../models/productModels/sectionProduct.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { storage } from '../../utils/firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const findAll = catchAsync(async (req, res) => {
  const sectionProducts = await SectionProduct.findAll({
    order: [['id', 'ASC']], // Ordenar por el id de manera ascendente
  });

  return res.status(200).json({
    status: 'success',
    results: sectionProducts.length,
    sectionProducts,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { sectionProduct } = req;

  return res.status(200).json({
    status: 'success',
    sectionProduct,
  });
});

export const create = catchAsync(async (req, res) => {
  const { name } = req.body;

  // Buffer para la imagen de la sección
  const imgBuffer = req.files['sectionProductImg'][0].buffer;
  const imgRef = ref(
    storage,
    `sectionProductImg/${Date.now()}-${
      req.files['sectionProductImg'][0].originalname
    }`
  );
  await uploadBytes(imgRef, imgBuffer);
  const imgUploaded = await getDownloadURL(imgRef);

  // Buffer para el ícono
  const iconBuffer = req.files['sectionIcon'][0].buffer;
  const iconRef = ref(
    storage,
    `sectionIcon/${Date.now()}-${req.files['sectionIcon'][0].originalname}`
  );
  await uploadBytes(iconRef, iconBuffer);
  const iconUploaded = await getDownloadURL(iconRef);

  const sectionProduct = await SectionProduct.create({
    name,
    sectionProductImg: imgUploaded,
    sectionIcon: iconUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The sectionProduct has been created',
    sectionProduct,
  });
});

export const update = catchAsync(async (req, res) => {
  const { sectionProduct } = req;
  const { name } = req.body;

  // Verifica si se proporciona un nuevo icono en la solicitud
  if (req.file) {
    const iconBuffer = req.file.buffer;
    const iconRef = ref(
      storage,
      `sectionIcon/${Date.now()}-${req.file.originalname}`
    );
    await uploadBytes(iconRef, iconBuffer);
    const iconUploaded = await getDownloadURL(iconRef);

    // Actualiza la información de la sección con el nuevo icono
    await sectionProduct.update({
      name,
      sectionIcon: iconUploaded,
    });
  } else {
    // Si no se proporciona un nuevo icono, actualiza solo el nombre
    await sectionProduct.update({
      name,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'sectionProduct information has been updated',
    sectionProduct,
  });
});

export const updateImg = catchAsync(async (req, res) => {
  const { sectionProduct } = req;

  const imgRef = ref(
    storage,
    `sectionProductImg/${Date.now()}-${req.file.originalname}`
  );

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  await sectionProduct.update({
    sectionProductImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'sectionProduct img has been updated',
    sectionProduct,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { sectionProduct } = req;

  await sectionProduct.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The sectionProduct with id: ${sectionProduct.id} has been deleted`,
  });
});
