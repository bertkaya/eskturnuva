import { useState, useEffect } from 'react';
import Head from 'next/head';

// --- 331 MAÇLIK FİKSTÜR VERİSİ ---
const RAW_DATA = {"A Grubu (16 Takım)":{"teams":["A1","A10","A11","A12","A13","A14","A15","A16","A2","A3","A4","A5","A6","A7","A8","A9"],"matches":[["a211","1. Maçlar (15:00 - 15:10)","ANA SALON 1","A8","A11"],["a212","1. Maçlar (15:00 - 15:10)","ANA SALON 2","A3","A16"],["a213","1. Maçlar (15:00 - 15:10)","ANA SALON 3","A4","A15"],["a214","1. Maçlar (15:00 - 15:10)","ANTRENMAN 1","A5","A14"],["a215","1. Maçlar (15:00 - 15:10)","ANTRENMAN 2","A6","A13"],["a216","1. Maçlar (15:00 - 15:10)","ANTRENMAN 3","A7","A12"],["a217","1. Maçlar (15:00 - 15:10)","ANTRENMAN 4","A1","A2"],["a218","1. Maçlar (15:00 - 15:10)","ANTRENMAN 5","A9","A10"],["a219","2. Maçlar (15:10 - 15:20)","ANA SALON 1","A5","A12"],["a220","2. Maçlar (15:10 - 15:20)","ANA SALON 2","A2","A15"],["a221","2. Maçlar (15:10 - 15:20)","ANA SALON 3","A3","A14"],["a222","2. Maçlar (15:10 - 15:20)","ANTRENMAN 1","A4","A13"],["a223","2. Maçlar (15:10 - 15:20)","ANTRENMAN 2","A1","A16"],["a224","2. Maçlar (15:10 - 15:20)","ANTRENMAN 3","A6","A11"],["a225","2. Maçlar (15:10 - 15:20)","ANTRENMAN 4","A7","A10"],["a226","2. Maçlar (15:10 - 15:20)","ANTRENMAN 5","A8","A9"],["a227","3. Maçlar (15:20 - 15:30)","ANA SALON 1","A1","A15"],["a228","3. Maçlar (15:20 - 15:30)","ANA SALON 2","A16","A14"],["a229","3. Maçlar (15:20 - 15:30)","ANA SALON 3","A2","A13"],["a230","3. Maçlar (15:20 - 15:30)","ANTRENMAN 1","A3","A12"],["a231","3. Maçlar (15:20 - 15:30)","ANTRENMAN 2","A4","A11"],["a232","3. Maçlar (15:20 - 15:30)","ANTRENMAN 3","A5","A10"],["a233","3. Maçlar (15:20 - 15:30)","ANTRENMAN 4","A6","A9"],["a234","3. Maçlar (15:20 - 15:30)","ANTRENMAN 5","A7","A8"],["a235","4. Maçlar (15:30 - 15:40)","ANA SALON 1","A4","A9"],["a236","4. Maçlar (15:30 - 15:40)","ANA SALON 2","A15","A13"],["a237","4. Maçlar (15:30 - 15:40)","ANA SALON 3","A16","A12"],["a238","4. Maçlar (15:30 - 15:40)","ANTRENMAN 1","A2","A11"],["a239","4. Maçlar (15:30 - 15:40)","ANTRENMAN 2","A3","A10"],["a240","4. Maçlar (15:30 - 15:40)","ANTRENMAN 3","A1","A14"],["a241","4. Maçlar (15:30 - 15:40)","ANTRENMAN 4","A5","A8"],["a242","4. Maçlar (15:30 - 15:40)","ANTRENMAN 5","A6","A7"],["a243","5. Maçlar (15:40 - 15:50)","ANA SALON 1","A1","A13"],["a244","5. Maçlar (15:40 - 15:50)","ANA SALON 2","A14","A12"],["a245","5. Maçlar (15:40 - 15:50)","ANA SALON 3","A15","A11"],["a246","5. Maçlar (15:40 - 15:50)","ANTRENMAN 1","A16","A10"],["a247","5. Maçlar (15:40 - 15:50)","ANTRENMAN 2","A2","A9"],["a248","5. Maçlar (15:40 - 15:50)","ANTRENMAN 3","A3","A8"],["a249","5. Maçlar (15:40 - 15:50)","ANTRENMAN 4","A4","A7"],["a250","5. Maçlar (15:40 - 15:50)","ANTRENMAN 5","A5","A6"],["a251","6. Maçlar (15:50 - 16:00)","ANA SALON 1","A16","A8"],["a252","6. Maçlar (15:50 - 16:00)","ANA SALON 2","A13","A11"],["a253","6. Maçlar (15:50 - 16:00)","ANA SALON 3","A14","A10"],["a254","6. Maçlar (15:50 - 16:00)","ANTRENMAN 1","A15","A9"],["a255","6. Maçlar (15:50 - 16:00)","ANTRENMAN 2","A1","A12"],["a256","6. Maçlar (15:50 - 16:00)","ANTRENMAN 3","A2","A7"],["a257","6. Maçlar (15:50 - 16:00)","ANTRENMAN 4","A3","A6"],["a258","6. Maçlar (15:50 - 16:00)","ANTRENMAN 5","A4","A5"],["a259","7. Maçlar (16:00 - 16:10)","ANA SALON 1","A2","A5"],["a260","7. Maçlar (16:00 - 16:10)","ANA SALON 2","A12","A10"],["a261","7. Maçlar (16:00 - 16:10)","ANA SALON 3","A13","A9"],["a262","7. Maçlar (16:00 - 16:10)","ANTRENMAN 1","A1","A11"],["a263","7. Maçlar (16:00 - 16:10)","ANTRENMAN 2","A15","A7"],["a264","7. Maçlar (16:00 - 16:10)","ANTRENMAN 3","A16","A6"],["a265","7. Maçlar (16:00 - 16:10)","ANTRENMAN 4","A14","A8"],["a266","7. Maçlar (16:00 - 16:10)","ANTRENMAN 5","A3","A4"],["a267","8. Maçlar (16:10 - 16:20)","ANA SALON 1","A14","A6"],["a268","8. Maçlar (16:10 - 16:20)","ANA SALON 2","A11","A9"],["a269","8. Maçlar (16:10 - 16:20)","ANA SALON 3","A1","A10"],["a270","8. Maçlar (16:10 - 16:20)","ANTRENMAN 1","A13","A7"],["a271","8. Maçlar (16:10 - 16:20)","ANTRENMAN 2","A12","A8"],["a272","8. Maçlar (16:10 - 16:20)","ANTRENMAN 3","A15","A5"],["a273","8. Maçlar (16:10 - 16:20)","ANTRENMAN 4","A16","A4"],["a274","8. Maçlar (16:10 - 16:20)","ANTRENMAN 5","A2","A3"],["a275","9. Maçlar (16:20 - 16:30)","ANA SALON 1","A12","A6"],["a276","9. Maçlar (16:20 - 16:30)","ANA SALON 2","A1","A9"],["a277","9. Maçlar (16:20 - 16:30)","ANA SALON 3","A11","A7"],["a278","9. Maçlar (16:20 - 16:30)","ANTRENMAN 1","A10","A8"],["a279","9. Maçlar (16:20 - 16:30)","ANTRENMAN 2","A13","A5"],["a280","9. Maçlar (16:20 - 16:30)","ANTRENMAN 3","A14","A4"],["a281","9. Maçlar (16:20 - 16:30)","ANTRENMAN 4","A15","A3"],["a282","9. Maçlar (16:20 - 16:30)","ANTRENMAN 5","A16","A2"],["a283","10. Maçlar (16:30 - 16:40)","ANA SALON 1","A14","A2"],["a284","10. Maçlar (16:30 - 16:40)","ANA SALON 2","A1","A8"],["a285","10. Maçlar (16:30 - 16:40)","ANA SALON 3","A9","A7"],["a286","10. Maçlar (16:30 - 16:40)","ANTRENMAN 1","A12","A4"],["a287","10. Maçlar (16:30 - 16:40)","ANTRENMAN 2","A10","A6"],["a288","10. Maçlar (16:30 - 16:40)","ANTRENMAN 3","A13","A3"],["a289","10. Maçlar (16:30 - 16:40)","ANTRENMAN 4","A11","A5"],["a290","10. Maçlar (16:30 - 16:40)","ANTRENMAN 5","A15","A16"],["a291","11. Maçlar (16:40 - 16:50)","ANA SALON 1","A10","A4"],["a292","11. Maçlar (16:40 - 16:50)","ANA SALON 2","A8","A6"],["a293","11. Maçlar (16:40 - 16:50)","ANA SALON 3","A9","A5"],["a294","11. Maçlar (16:40 - 16:50)","ANTRENMAN 1","A1","A7"],["a295","11. Maçlar (16:40 - 16:50)","ANTRENMAN 2","A11","A3"],["a296","11. Maçlar (16:40 - 16:50)","ANTRENMAN 3","A12","A2"],["a297","11. Maçlar (16:40 - 16:50)","ANTRENMAN 4","A13","A16"],["a298","11. Maçlar (16:40 - 16:50)","ANTRENMAN 5","A14","A15"],["a299","12. Maçlar (16:50 - 17:00)","ANA SALON 1","A11","A16"],["a300","12. Maçlar (16:50 - 17:00)","ANA SALON 2","A7","A5"],["a301","12. Maçlar (16:50 - 17:00)","ANA SALON 3","A8","A4"],["a302","12. Maçlar (16:50 - 17:00)","ANTRENMAN 1","A9","A3"],["a303","12. Maçlar (16:50 - 17:00)","ANTRENMAN 2","A10","A2"],["a304","12. Maçlar (16:50 - 17:00)","ANTRENMAN 3","A1","A6"],["a305","12. Maçlar (16:50 - 17:00)","ANTRENMAN 4","A12","A15"],["a306","12. Maçlar (16:50 - 17:00)","ANTRENMAN 5","A13","A14"],["a307","13. Maçlar (17:00 - 17:10)","ANA SALON 1","A7","A3"],["a308","13. Maçlar (17:00 - 17:10)","ANA SALON 2","A6","A4"],["a309","13. Maçlar (17:00 - 17:10)","ANA SALON 3","A1","A5"],["a310","13. Maçlar (17:00 - 17:10)","ANTRENMAN 1","A8","A2"],["a311","13. Maçlar (17:00 - 17:10)","ANTRENMAN 2","A9","A16"],["a312","13. Maçlar (17:00 - 17:10)","ANTRENMAN 3","A10","A15"],["a313","13. Maçlar (17:00 - 17:10)","ANTRENMAN 4","A11","A14"],["a314","13. Maçlar (17:00 - 17:10)","ANTRENMAN 5","A12","A13"],["a315","14. Maçlar (17:10 - 17:20)","ANA SALON 1","A10","A13"],["a316","14. Maçlar (17:10 - 17:20)","ANA SALON 2","A5","A3"],["a317","14. Maçlar (17:10 - 17:20)","ANA SALON 3","A6","A2"],["a318","14. Maçlar (17:10 - 17:20)","ANTRENMAN 1","A7","A16"],["a319","14. Maçlar (17:10 - 17:20)","ANTRENMAN 2","A8","A15"],["a320","14. Maçlar (17:10 - 17:20)","ANTRENMAN 3","A9","A14"],["a321","14. Maçlar (17:10 - 17:20)","ANTRENMAN 4","A1","A4"],["a322","14. Maçlar (17:10 - 17:20)","ANTRENMAN 5","A11","A12"],["a323","15. Maçlar (17:20 - 17:30)","ANA SALON 1","A1","A3"],["a324","15. Maçlar (17:20 - 17:30)","ANA SALON 2","A4","A2"],["a325","15. Maçlar (17:20 - 17:30)","ANA SALON 3","A5","A16"],["a326","15. Maçlar (17:20 - 17:30)","ANTRENMAN 1","A6","A15"],["a327","15. Maçlar (17:20 - 17:30)","ANTRENMAN 2","A7","A14"],["a328","15. Maçlar (17:20 - 17:30)","ANTRENMAN 3","A8","A13"],["a329","15. Maçlar (17:20 - 17:30)","ANTRENMAN 4","A9","A12"],["a330","15. Maçlar (17:20 - 17:30)","ANTRENMAN 5","A10","A11"]]},"B Grubu (16 Takım)":{"teams":["B1","B10","B11","B12","B13","B14","B15","B16","B2","B3","B4","B5","B6","B7","B8","B9"],"matches":[["b91","1. Maçlar (12:20 - 12:30)","ANA SALON 1","B3","B16"],["b92","1. Maçlar (12:20 - 12:30)","ANA SALON 2","B5","B14"],["b93","1. Maçlar (12:20 - 12:30)","ANA SALON 3","B4","B15"],["b94","1. Maçlar (12:20 - 12:30)","ANTRENMAN 1","B1","B2"],["b95","1. Maçlar (12:20 - 12:30)","ANTRENMAN 2","B6","B13"],["b96","1. Maçlar (12:20 - 12:30)","ANTRENMAN 3","B7","B12"],["b97","1. Maçlar (12:20 - 12:30)","ANTRENMAN 4","B8","B11"],["b98","1. Maçlar (12:20 - 12:30)","ANTRENMAN 5","B9","B10"],["b99","2. Maçlar (12:30 - 12:40)","ANA SALON 1","B5","B12"],["b100","2. Maçlar (12:30 - 12:40)","ANA SALON 2","B2","B15"],["b101","2. Maçlar (12:30 - 12:40)","ANA SALON 3","B3","B14"],["b102","2. Maçlar (12:30 - 12:40)","ANTRENMAN 1","B4","B13"],["b103","2. Maçlar (12:30 - 12:40)","ANTRENMAN 2","B1","B16"],["b104","2. Maçlar (12:30 - 12:40)","ANTRENMAN 3","B6","B11"],["b105","2. Maçlar (12:30 - 12:40)","ANTRENMAN 4","B7","B10"],["b106","2. Maçlar (12:30 - 12:40)","ANTRENMAN 5","B8","B9"],["b107","3. Maçlar (12:40 - 12:50)","ANA SALON 1","B2","B13"],["b108","3. Maçlar (12:40 - 12:50)","ANA SALON 2","B16","B14"],["b109","3. Maçlar (12:40 - 12:50)","ANA SALON 3","B6","B9"],["b110","3. Maçlar (12:40 - 12:50)","ANTRENMAN 1","B3","B12"],["b111","3. Maçlar (12:40 - 12:50)","ANTRENMAN 2","B4","B11"],["b112","3. Maçlar (12:40 - 12:50)","ANTRENMAN 3","B5","B10"],["b113","3. Maçlar (12:40 - 12:50)","ANTRENMAN 4","B1","B15"],["b114","3. Maçlar (12:40 - 12:50)","ANTRENMAN 5","B7","B8"],["b115","4. Maçlar (12:50 - 13:00)","ANA SALON 1","B16","B12"],["b116","4. Maçlar (12:50 - 13:00)","ANA SALON 2","B15","B13"],["b117","4. Maçlar (12:50 - 13:00)","ANA SALON 3","B1","B14"],["b118","4. Maçlar (12:50 - 13:00)","ANTRENMAN 1","B2","B11"],["b119","4. Maçlar (12:50 - 13:00)","ANTRENMAN 2","B3","B10"],["b120","4. Maçlar (12:50 - 13:00)","ANTRENMAN 3","B4","B9"],["b121","4. Maçlar (12:50 - 13:00)","ANTRENMAN 4","B5","B8"],["b122","4. Maçlar (12:50 - 13:00)","ANTRENMAN 5","B6","B7"],["b123","5. Maçlar (13:00 - 13:10)","ANA SALON 1","B1","B13"],["b124","5. Maçlar (13:00 - 13:10)","ANA SALON 2","B14","B12"],["b125","5. Maçlar (13:00 - 13:10)","ANA SALON 3","B15","B11"],["b126","5. Maçlar (13:00 - 13:10)","ANTRENMAN 1","B16","B10"],["b127","5. Maçlar (13:00 - 13:10)","ANTRENMAN 2","B2","B9"],["b128","5. Maçlar (13:00 - 13:10)","ANTRENMAN 3","B3","B8"],["b129","5. Maçlar (13:00 - 13:10)","ANTRENMAN 4","B4","B7"],["b130","5. Maçlar (13:00 - 13:10)","ANTRENMAN 5","B5","B6"],["b131","6. Maçlar (13:10 - 13:20)","ANA SALON 1","B14","B10"],["b132","6. Maçlar (13:10 - 13:20)","ANA SALON 2","B13","B11"],["b133","6. Maçlar (13:10 - 13:20)","ANA SALON 3","B1","B12"],["b134","6. Maçlar (13:10 - 13:20)","ANTRENMAN 1","B15","B9"],["b135","6. Maçlar (13:10 - 13:20)","ANTRENMAN 2","B16","B8"],["b136","6. Maçlar (13:10 - 13:20)","ANTRENMAN 3","B2","B7"],["b137","6. Maçlar (13:10 - 13:20)","ANTRENMAN 4","B3","B6"],["b138","6. Maçlar (13:10 - 13:20)","ANTRENMAN 5","B4","B5"],["b139","7. Maçlar (13:20 - 13:30)","ANA SALON 1","B16","B6"],["b140","7. Maçlar (13:20 - 13:30)","ANA SALON 2","B12","B10"],["b141","7. Maçlar (13:20 - 13:30)","ANA SALON 3","B13","B9"],["b142","7. Maçlar (13:20 - 13:30)","ANTRENMAN 1","B14","B8"],["b143","7. Maçlar (13:20 - 13:30)","ANTRENMAN 2","B15","B7"],["b144","7. Maçlar (13:20 - 13:30)","ANTRENMAN 3","B1","B11"],["b145","7. Maçlar (13:20 - 13:30)","ANTRENMAN 4","B2","B5"],["b146","7. Maçlar (13:20 - 13:30)","ANTRENMAN 5","B3","B4"],["b147","8. Maçlar (13:30 - 13:40)","ANA SALON 1","B14","B6"],["b148","8. Maçlar (13:30 - 13:40)","ANA SALON 2","B11","B9"],["b149","8. Maçlar (13:30 - 13:40)","ANA SALON 3","B12","B8"],["b150","8. Maçlar (13:30 - 13:40)","ANTRENMAN 1","B13","B7"],["b151","8. Maçlar (13:30 - 13:40)","ANTRENMAN 2","B1","B10"],["b152","8. Maçlar (13:30 - 13:40)","ANTRENMAN 3","B15","B5"],["b153","8. Maçlar (13:30 - 13:40)","ANTRENMAN 4","B16","B4"],["b154","8. Maçlar (13:30 - 13:40)","ANTRENMAN 5","B2","B3"],["b155","9. Maçlar (13:40 - 13:50)","ANA SALON 1","B15","B3"],["b156","9. Maçlar (13:40 - 13:50)","ANA SALON 2","B10","B8"],["b157","9. Maçlar (13:40 - 13:50)","ANA SALON 3","B11","B7"],["b158","9. Maçlar (13:40 - 13:50)","ANTRENMAN 1","B12","B6"],["b159","9. Maçlar (13:40 - 13:50)","ANTRENMAN 2","B13","B5"],["b160","9. Maçlar (13:40 - 13:50)","ANTRENMAN 3","B14","B4"],["b161","9. Maçlar (13:40 - 13:50)","ANTRENMAN 4","B1","B9"],["b162","9. Maçlar (13:40 - 13:50)","ANTRENMAN 5","B16","B2"],["b163","10. Maçlar (13:50 - 14:00)","ANA SALON 1","B1","B8"],["b164","10. Maçlar (13:50 - 14:00)","ANA SALON 2","B9","B7"],["b165","10. Maçlar (13:50 - 14:00)","ANA SALON 3","B10","B6"],["b166","10. Maçlar (13:50 - 14:00)","ANTRENMAN 1","B11","B5"],["b167","10. Maçlar (13:50 - 14:00)","ANTRENMAN 2","B12","B4"],["b168","10. Maçlar (13:50 - 14:00)","ANTRENMAN 3","B13","B3"],["b169","10. Maçlar (13:50 - 14:00)","ANTRENMAN 4","B14","B2"],["b170","10. Maçlar (13:50 - 14:00)","ANTRENMAN 5","B15","B16"],["b171","11. Maçlar (14:00 - 14:10)","ANA SALON 1","B9","B5"],["b172","11. Maçlar (14:00 - 14:10)","ANA SALON 2","B8","B6"],["b173","11. Maçlar (14:00 - 14:10)","ANA SALON 3","B1","B7"],["b174","11. Maçlar (14:00 - 14:10)","ANTRENMAN 1","B10","B4"],["b175","11. Maçlar (14:00 - 14:10)","ANTRENMAN 2","B11","B3"],["b176","11. Maçlar (14:00 - 14:10)","ANTRENMAN 3","B12","B2"],["b177","11. Maçlar (14:00 - 14:10)","ANTRENMAN 4","B13","B16"],["b178","11. Maçlar (14:00 - 14:10)","ANTRENMAN 5","B14","B15"],["b179","12. Maçlar (14:10 - 14:20)","ANA SALON 1","B7","B5"],["b180","12. Maçlar (14:10 - 14:20)","ANA SALON 2","B1","B6"],["b181","12. Maçlar (14:10 - 14:20)","ANA SALON 3","B8","B4"],["b182","12. Maçlar (14:10 - 14:20)","ANTRENMAN 1","B9","B3"],["b183","12. Maçlar (14:10 - 14:20)","ANTRENMAN 2","B10","B2"],["b184","12. Maçlar (14:10 - 14:20)","ANTRENMAN 3","B11","B16"],["b185","12. Maçlar (14:10 - 14:20)","ANTRENMAN 4","B12","B15"],["b186","12. Maçlar (14:10 - 14:20)","ANTRENMAN 5","B13","B14"],["b187","13. Maçlar (14:20 - 14:30)","ANA SALON 1","B8","B2"],["b188","13. Maçlar (14:20 - 14:30)","ANA SALON 2","B6","B4"],["b189","13. Maçlar (14:20 - 14:30)","ANA SALON 3","B7","B3"],["b190","13. Maçlar (14:20 - 14:30)","ANTRENMAN 1","B1","B5"],["b191","13. Maçlar (14:20 - 14:30)","ANTRENMAN 2","B9","B16"],["b192","13. Maçlar (14:20 - 14:30)","ANTRENMAN 3","B10","B15"],["b193","13. Maçlar (14:20 - 14:30)","ANTRENMAN 4","B11","B14"],["b194","13. Maçlar (14:20 - 14:30)","ANTRENMAN 5","B12","B13"],["b195","14. Maçlar (14:30 - 14:40)","ANA SALON 1","B1","B4"],["b196","14. Maçlar (14:30 - 14:40)","ANA SALON 2","B5","B3"],["b197","14. Maçlar (14:30 - 14:40)","ANA SALON 3","B6","B2"],["b198","14. Maçlar (14:30 - 14:40)","ANTRENMAN 1","B7","B16"],["b199","14. Maçlar (14:30 - 14:40)","ANTRENMAN 2","B8","B15"],["b200","14. Maçlar (14:30 - 14:40)","ANTRENMAN 3","B9","B14"],["b201","14. Maçlar (14:30 - 14:40)","ANTRENMAN 4","B10","B13"],["b202","14. Maçlar (14:30 - 14:40)","ANTRENMAN 5","B11","B12"],["b203","15. Maçlar (14:40 - 14:50)","ANA SALON 1","B10","B11"],["b204","15. Maçlar (14:40 - 14:50)","ANA SALON 2","B4","B2"],["b205","15. Maçlar (14:40 - 14:50)","ANA SALON 3","B5","B16"],["b206","15. Maçlar (14:40 - 14:50)","ANTRENMAN 1","B6","B15"],["b207","15. Maçlar (14:40 - 14:50)","ANTRENMAN 2","B7","B14"],["b208","15. Maçlar (14:40 - 14:50)","ANTRENMAN 3","B8","B13"],["b209","15. Maçlar (14:40 - 14:50)","ANTRENMAN 4","B9","B12"],["b210","15. Maçlar (14:40 - 14:50)","ANTRENMAN 5","B1","B3"]]},"C Grubu (14 Takım)":{"teams":["C1","C10","C11","C12","C13","C14","C2","C3","C4","C5","C6","C7","C8","C9"],"matches":[["c0","1. Maçlar (10:00 - 10:10)","ANA SALON 1","C8","C9"],["c1","1. Maçlar (10:00 - 10:10)","ANA SALON 2","C1","C2"],["c2","1. Maçlar (10:00 - 10:10)","ANA SALON 3","C4","C13"],["c3","1. Maçlar (10:00 - 10:10)","ANTRENMAN 1","C5","C12"],["c4","1. Maçlar (10:00 - 10:10)","ANTRENMAN 2","C6","C11"],["c5","1. Maçlar (10:00 - 10:10)","ANTRENMAN 3","C7","C10"],["c6","1. Maçlar (10:00 - 10:10)","ANTRENMAN 4","C3","C14"],["c7","2. Maçlar (10:10 - 10:20)","ANA SALON 1","C2","C13"],["c8","2. Maçlar (10:10 - 10:20)","ANA SALON 2","C1","C14"],["c9","2. Maçlar (10:10 - 10:20)","ANA SALON 3","C3","C12"],["c10","2. Maçlar (10:10 - 10:20)","ANTRENMAN 1","C4","C11"],["c11","2. Maçlar (10:10 - 10:20)","ANTRENMAN 2","C5","C10"],["c12","2. Maçlar (10:10 - 10:20)","ANTRENMAN 3","C6","C9"],["c13","2. Maçlar (10:10 - 10:20)","ANTRENMAN 4","C7","C8"],["c14","3. Maçlar (10:20 - 10:30)","ANA SALON 1","C2","C11"],["c15","3. Maçlar (10:20 - 10:30)","ANA SALON 2","C14","C12"],["c16","3. Maçlar (10:20 - 10:30)","ANA SALON 3","C1","C13"],["c17","3. Maçlar (10:20 - 10:30)","ANTRENMAN 1","C3","C10"],["c18","3. Maçlar (10:20 - 10:30)","ANTRENMAN 2","C4","C9"],["c19","3. Maçlar (10:20 - 10:30)","ANTRENMAN 3","C5","C8"],["c20","3. Maçlar (10:20 - 10:30)","ANTRENMAN 4","C6","C7"],["c21","4. Maçlar (10:30 - 10:40)","ANA SALON 1","C14","C10"],["c22","4. Maçlar (10:30 - 10:40)","ANA SALON 2","C13","C11"],["c23","4. Maçlar (10:30 - 10:40)","ANA SALON 3","C1","C12"],["c24","4. Maçlar (10:30 - 10:40)","ANTRENMAN 1","C2","C9"],["c25","4. Maçlar (10:30 - 10:40)","ANTRENMAN 2","C3","C8"],["c26","4. Maçlar (10:30 - 10:40)","ANTRENMAN 3","C4","C7"],["c27","4. Maçlar (10:30 - 10:40)","ANTRENMAN 4","C5","C6"],["c28","5. Maçlar (10:40 - 10:50)","ANA SALON 1","C3","C6"],["c29","5. Maçlar (10:40 - 10:50)","ANA SALON 2","C12","C10"],["c30","5. Maçlar (10:40 - 10:50)","ANA SALON 3","C13","C9"],["c31","5. Maçlar (10:40 - 10:50)","ANTRENMAN 1","C14","C8"],["c32","5. Maçlar (10:40 - 10:50)","ANTRENMAN 2","C2","C7"],["c33","5. Maçlar (10:40 - 10:50)","ANTRENMAN 3","C1","C11"],["c34","5. Maçlar (10:40 - 10:50)","ANTRENMAN 4","C4","C5"],["c35","6. Maçlar (10:50 - 11:00)","ANA SALON 1","C3","C4"],["c36","6. Maçlar (10:50 - 11:00)","ANA SALON 2","C11","C9"],["c37","6. Maçlar (10:50 - 11:00)","ANA SALON 3","C12","C8"],["c38","6. Maçlar (10:50 - 11:00)","ANTRENMAN 1","C13","C7"],["c39","6. Maçlar (10:50 - 11:00)","ANTRENMAN 2","C14","C6"],["c40","6. Maçlar (10:50 - 11:00)","ANTRENMAN 3","C2","C5"],["c41","6. Maçlar (10:50 - 11:00)","ANTRENMAN 4","C1","C10"],["c42","7. Maçlar (11:00 - 11:10)","ANA SALON 1","C13","C5"],["c43","7. Maçlar (11:00 - 11:10)","ANA SALON 2","C10","C8"],["c44","7. Maçlar (11:00 - 11:10)","ANA SALON 3","C11","C7"],["c45","7. Maçlar (11:00 - 11:10)","ANTRENMAN 1","C12","C6"],["c46","7. Maçlar (11:00 - 11:10)","ANTRENMAN 2","C1","C9"],["c47","7. Maçlar (11:00 - 11:10)","ANTRENMAN 3","C14","C4"],["c48","7. Maçlar (11:00 - 11:10)","ANTRENMAN 4","C2","C3"],["c49","8. Maçlar (11:10 - 11:20)","ANA SALON 1","C12","C4"],["c50","8. Maçlar (11:10 - 11:20)","ANA SALON 2","C9","C7"],["c51","8. Maçlar (11:10 - 11:20)","ANA SALON 3","C10","C6"],["c52","8. Maçlar (11:10 - 11:20)","ANTRENMAN 1","C11","C5"],["c53","8. Maçlar (11:10 - 11:20)","ANTRENMAN 2","C14","C2"],["c54","8. Maçlar (11:10 - 11:20)","ANTRENMAN 3","C13","C3"],["c55","8. Maçlar (11:10 - 11:20)","ANTRENMAN 4","C1","C8"],["c56","9. Maçlar (11:20 - 11:30)","ANA SALON 1","C1","C7"],["c57","9. Maçlar (11:20 - 11:30)","ANA SALON 2","C8","C6"],["c58","9. Maçlar (11:20 - 11:30)","ANA SALON 3","C9","C5"],["c59","9. Maçlar (11:20 - 11:30)","ANTRENMAN 1","C10","C4"],["c60","9. Maçlar (11:20 - 11:30)","ANTRENMAN 2","C11","C3"],["c61","9. Maçlar (11:20 - 11:30)","ANTRENMAN 3","C12","C2"],["c62","9. Maçlar (11:20 - 11:30)","ANTRENMAN 4","C13","C14"],["c63","10. Maçlar (11:30 - 11:40)","ANA SALON 1","C1","C6"],["c64","10. Maçlar (11:30 - 11:40)","ANA SALON 2","C7","C5"],["c65","10. Maçlar (11:30 - 11:40)","ANA SALON 3","C8","C4"],["c66","10. Maçlar (11:30 - 11:40)","ANTRENMAN 1","C9","C3"],["c67","10. Maçlar (11:30 - 11:40)","ANTRENMAN 2","C10","C2"],["c68","10. Maçlar (11:30 - 11:40)","ANTRENMAN 3","C11","C14"],["c69","10. Maçlar (11:30 - 11:40)","ANTRENMAN 4","C12","C13"],["c70","11. Maçlar (11:40 - 11:50)","ANA SALON 1","C9","C14"],["c71","11. Maçlar (11:40 - 11:50)","ANA SALON 2","C6","C4"],["c72","11. Maçlar (11:40 - 11:50)","ANA SALON 3","C7","C3"],["c73","11. Maçlar (11:40 - 11:50)","ANTRENMAN 1","C8","C2"],["c74","11. Maçlar (11:40 - 11:50)","ANTRENMAN 2","C1","C5"],["c75","11. Maçlar (11:40 - 11:50)","ANTRENMAN 3","C10","C13"],["c76","11. Maçlar (11:40 - 11:50)","ANTRENMAN 4","C11","C12"],["c77","12. Maçlar (11:50 - 12:00)","ANA SALON 1","C7","C14"],["c78","12. Maçlar (11:50 - 12:00)","ANA SALON 2","C5","C3"],["c79","12. Maçlar (11:50 - 12:00)","ANA SALON 3","C6","C2"],["c80","12. Maçlar (11:50 - 12:00)","ANTRENMAN 1","C1","C4"],["c81","12. Maçlar (11:50 - 12:00)","ANTRENMAN 2","C8","C13"],["c82","12. Maçlar (11:50 - 12:00)","ANTRENMAN 3","C9","C12"],["c83","12. Maçlar (11:50 - 12:00)","ANTRENMAN 4","C10","C11"],["c84","13. Maçlar (12:00 - 12:10)","ANA SALON 1","C8","C11"],["c85","13. Maçlar (12:00 - 12:10)","ANA SALON 2","C4","C2"],["c86","13. Maçlar (12:00 - 12:10)","ANA SALON 3","C5","C14"],["c87","13. Maçlar (12:00 - 12:10)","ANTRENMAN 1","C6","C13"],["c88","13. Maçlar (12:00 - 12:10)","ANTRENMAN 2","C7","C12"],["c89","13. Maçlar (12:00 - 12:10)","ANTRENMAN 3","C1","C3"],["c90","13. Maçlar (12:00 - 12:10)","ANTRENMAN 4","C9","C10"]]}};

const INITIAL_DATA = {};
Object.keys(RAW_DATA).forEach(group => {
  INITIAL_DATA[group] = {
    teams: RAW_DATA[group].teams,
    matches: RAW_DATA[group].matches.map(m => ({
      id: m[0],
      round: m[1],
      salon: m[2],
      home: m[3],
      away: m[4],
      homeScore: "",
      awayScore: ""
    }))
  };
});

export default function Home() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeGroup, setActiveGroup] = useState("A Grubu (16 Takım)");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRoundFilter, setActiveRoundFilter] = useState("Tümü");

  useEffect(() => {
    setActiveRoundFilter("Tümü");
    setSearchTerm("");
  }, [activeGroup]);

  const handleScoreChange = (group, matchId, field, value) => {
    setData(prev => {
      const updatedMatches = prev[group].matches.map(m => {
        if (m.id === matchId) {
          return { ...m, [field]: value === "" ? "" : parseInt(value, 10) };
        }
        return m;
      });
      return { ...prev, [group]: { ...prev[group], matches: updatedMatches } };
    });
  };

  const calculateTable = (groupName) => {
    const group = data[groupName];
    const table = {};
    group.teams.forEach(t => table[t] = { name: t, gp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 });

    group.matches.forEach(m => {
      if (m.homeScore !== "" && m.awayScore !== "") {
        const hs = m.homeScore;
        const as = m.awayScore;
        table[m.home].gp += 1; table[m.away].gp += 1;
        table[m.home].gf += hs; table[m.home].ga += as;
        table[m.away].gf += as; table[m.away].ga += hs;
        if (hs > as) { table[m.home].w += 1; table[m.home].pts += 3; table[m.away].l += 1; }
        else if (hs < as) { table[m.away].w += 1; table[m.away].pts += 3; table[m.home].l += 1; }
        else { table[m.home].d += 1; table[m.home].pts += 1; table[m.away].d += 1; table[m.away].pts += 1; }
        table[m.home].gd = table[m.home].gf - table[m.home].ga;
        table[m.away].gd = table[m.away].gf - table[m.away].ga;
      }
    });
    return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  };

  const currentTable = calculateTable(activeGroup);
  
  const uniqueRounds = Array.from(new Set(data[activeGroup].matches.map(m => m.round)));
  const displayedMatches = data[activeGroup].matches.filter(m => {
    const matchSearch = !searchTerm || m.home.toLowerCase().includes(searchTerm.toLowerCase()) || m.away.toLowerCase().includes(searchTerm.toLowerCase());
    const roundMatch = activeRoundFilter === "Tümü" || m.round === activeRoundFilter;
    return matchSearch && roundMatch;
  });

  return (
    <div className="min-h-screen bg-[#18181b] text-[#f4f4f5] font-['Gotham',_sans-serif] selection:bg-[#ff6600] selection:text-white">
      <Head>
        <title>Eczacıbaşı Geleceğe Smaç Mini Voleybol Şenliği</title>
        <link href="https://fonts.cdnfonts.com/css/gotham" rel="stylesheet" />
      </Head>

      {/* HEADER: Koyu Füme ve Turuncu Accent */}
      <header className="bg-[#121214] border-b border-[#27272a] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6600] to-[#e65c00] rounded-2xl shadow-lg shadow-[#ff6600]/20 flex items-center justify-center">
              <span className="text-2xl text-white">🏐</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase font-['Gotham-Black',_sans-serif]">
                Eczacıbaşı Geleceğe Smaç
              </h1>
              <p className="text-[11px] text-[#ff6600] font-bold tracking-widest uppercase mt-0.5">Mini Voleybol Şenliği Takip Paneli</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto relative">
            <input 
              type="text" 
              placeholder="Takım Ara... (Örn: A1)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 bg-[#1f1f22] border border-[#3f3f46] rounded-xl px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-[#ff6600] focus:ring-2 focus:ring-[#ff6600]/20 transition-all placeholder:text-[#71717a]"
            />
            <span className="absolute left-4 top-3 text-[#71717a] text-lg">🔍</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* ÜST FİLTRELER: Gruplar ve Saatler */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          
          {/* Gruplar (Hap Butonlar) */}
          <div className="flex flex-wrap gap-2 bg-[#1f1f22] p-1.5 rounded-2xl border border-[#27272a]">
            {Object.keys(data).map(group => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all duration-300 ${
                  activeGroup === group 
                    ? 'bg-[#ff6600] text-white shadow-md shadow-[#ff6600]/30' 
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Maç Saatleri Filtresi */}
          <div className="w-full lg:w-auto overflow-hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              <button
                onClick={() => setActiveRoundFilter("Tümü")}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-all ${
                  activeRoundFilter === "Tümü" 
                    ? 'bg-white text-[#18181b]' 
                    : 'bg-[#1f1f22] text-[#a1a1aa] border border-[#27272a] hover:border-[#3f3f46] hover:text-white'
                }`}
              >
                Tüm Fikstür
              </button>
              {uniqueRounds.map(round => (
                <button
                  key={round}
                  onClick={() => setActiveRoundFilter(round)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase transition-all ${
                    activeRoundFilter === round 
                      ? 'bg-white text-[#18181b]' 
                      : 'bg-[#1f1f22] text-[#a1a1aa] border border-[#27272a] hover:border-[#3f3f46] hover:text-[#ff6600]'
                  }`}
                >
                  {round.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANA İÇERİK IZGARASI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* SOL PANEL: Maç Skor Girişi */}
          <div className="lg:col-span-5 bg-[#1f1f22] border border-[#27272a] rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wide">Skor Girişi</h2>
                <p className="text-xs text-[#a1a1aa] mt-1">{activeRoundFilter === "Tümü" ? "Tüm Maçlar" : activeRoundFilter}</p>
              </div>
              <span className="bg-[#27272a] text-[#ff6600] font-bold text-[11px] px-3 py-1.5 rounded-lg">
                {displayedMatches.length} Maç
              </span>
            </div>
            
            <div className="space-y-4 max-h-[650px] overflow-y-auto pr-3 custom-scrollbar">
              {displayedMatches.length === 0 ? (
                <div className="text-center py-16 text-[#71717a] font-medium text-sm bg-[#18181b] rounded-2xl">
                  Seçili kritere uygun maç bulunamadı.
                </div>
              ) : (
                displayedMatches.map(match => {
                  const hasScore = match.homeScore !== "" && match.awayScore !== "";
                  return (
                    <div 
                      key={match.id} 
                      className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 ${
                        hasScore 
                          ? 'bg-[#18181b] border-[#27272a] opacity-80' 
                          : 'bg-[#252529] border-[#3f3f46] hover:border-[#ff6600]/60 hover:shadow-lg hover:shadow-[#ff6600]/5'
                      }`}
                    >
                      {/* Kart Üst Bilgisi */}
                      <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#3f3f46]/50">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                          hasScore ? 'bg-[#27272a] text-[#a1a1aa]' : 'bg-[#ff6600]/10 text-[#ff6600]'
                        }`}>
                          {match.round.split('(')[0].trim()}
                        </span>
                        <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                          📍 {match.salon}
                        </span>
                      </div>
                      
                      {/* Skor Alanı */}
                      <div className="flex items-center justify-between px-2">
                        <span className="w-[30%] text-right font-black text-sm text-white truncate">{match.home}</span>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            pattern="[0-9]*"
                            placeholder="-"
                            value={match.homeScore}
                            onChange={(e) => handleScoreChange(activeGroup, match.id, 'homeScore', e.target.value)}
                            className="w-14 h-12 bg-[#18181b] text-center rounded-xl border border-[#3f3f46] font-black text-lg text-[#ff6600] focus:outline-none focus:border-[#ff6600] focus:bg-[#1f1f22] transition-all placeholder:text-[#3f3f46] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[#71717a] font-black text-sm">:</span>
                          <input
                            type="number"
                            pattern="[0-9]*"
                            placeholder="-"
                            value={match.awayScore}
                            onChange={(e) => handleScoreChange(activeGroup, match.id, 'awayScore', e.target.value)}
                            className="w-14 h-12 bg-[#18181b] text-center rounded-xl border border-[#3f3f46] font-black text-lg text-[#ff6600] focus:outline-none focus:border-[#ff6600] focus:bg-[#1f1f22] transition-all placeholder:text-[#3f3f46] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                        <span className="w-[30%] text-left font-black text-sm text-white truncate">{match.away}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* SAĞ PANEL: Puan Durumu */}
          <div className="lg:col-span-7 bg-[#1f1f22] border border-[#27272a] rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wide">Puan Durumu</h2>
                <p className="text-xs text-[#a1a1aa] mt-1">Sıralama anlık olarak güncellenmektedir</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#27272a] bg-[#18181b]">
              <table className="w-full text-left text-sm table-fixed min-w-[600px]">
                <thead className="bg-[#252529] font-black uppercase text-[#a1a1aa] text-[11px] tracking-wider border-b border-[#27272a]">
                  <tr>
                    <th className="w-14 py-5 text-center">Sıra</th>
                    <th className="w-40 px-4 py-5">Takım Adı</th>
                    <th className="w-12 py-5 text-center">O</th>
                    <th className="w-12 py-5 text-center">G</th>
                    <th className="w-12 py-5 text-center">B</th>
                    <th className="w-12 py-5 text-center">M</th>
                    <th className="w-12 py-5 text-center text-[#71717a]" title="Atılan Sayı">AS</th>
                    <th className="w-12 py-5 text-center text-[#71717a]" title="Yenilen Sayı">YS</th>
                    <th className="w-12 py-5 text-center text-[#71717a]" title="Averaj">AV</th>
                    <th className="w-16 py-5 text-center text-[#ff6600] bg-[#ff6600]/10 rounded-tr-2xl">PTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] font-bold text-[#e4e4e7]">
                  {currentTable
                    .filter(row => !searchTerm || row.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((row, idx) => {
                      const isLeader = idx === 0 && row.pts > 0;
                      return (
                        <tr key={row.name} className="hover:bg-[#1f1f22] transition-colors">
                          <td className="py-4 text-center">
                            {isLeader ? (
                              <span className="bg-[#ff6600] text-white w-6 h-6 flex items-center justify-center rounded-full mx-auto text-xs shadow-md shadow-[#ff6600]/40">1</span>
                            ) : (
                              <span className="text-[#71717a]">{idx + 1}</span>
                            )}
                          </td>
                          <td className={`px-4 py-4 truncate ${isLeader ? 'text-white' : 'text-[#d4d4d8]'}`}>
                            {row.name}
                          </td>
                          <td className="py-4 text-center text-[#a1a1aa]">{row.gp}</td>
                          <td className="py-4 text-center text-white">{row.w}</td>
                          <td className="py-4 text-center text-white">{row.d}</td>
                          <td className="py-4 text-center text-white">{row.l}</td>
                          <td className="py-4 text-center text-[#71717a]">{row.gf}</td>
                          <td className="py-4 text-center text-[#71717a]">{row.ga}</td>
                          <td className={`py-4 text-center ${row.gd > 0 ? 'text-emerald-500' : row.gd < 0 ? 'text-rose-500' : 'text-[#71717a]'}`}>
                            {row.gd > 0 ? `+${row.gd}` : row.gd}
                          </td>
                          <td className="py-4 text-center font-black text-[#ff6600] bg-[#ff6600]/5 text-base">
                            {row.pts}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <style jsx global>{`
        /* Minimalist Scrollbar Tasarımı */
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff6600;
        }
      `}</style>
    </div>
  );
}
