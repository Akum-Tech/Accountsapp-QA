import ItemStock from "../models/itemStock";
import Company from "../models/company";
import Sequelize from "sequelize";
import { checkCode } from "../utility/statusCode";
import Units from "../models/units";
import State from "../models/states";
import StockGroup from "../models/stockGroup";
import subStockGroup from "../models/stockSubGroup";
import City from "../models/cities";
import { sequelize } from "../database/database";
import { decreptionItem } from "../security/itemStock";
const Op = Sequelize.Op;
import uniqid from "uniqid";
import "@babel/polyfill";

exports.getSingleData = async function(id, res) {
  try {
    let createdata = await ItemStock.findOne({ where: { uid: id } });
    if (createdata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStock fetch Successfully",
        ItemStock: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStock not Found!",
        ItemStock: createdata ? createdata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getAllData = async function(cid, res) {
  try {
    let createdata = await ItemStock.findAll({
      where: {
        company_id: cid
      },
      include: [
        {
          model: Company,
          include: [
            {
              model: City,
              attributes: ["name"],
              include: [
                {
                  model: State,
                  attributes: ["name"]
                }
              ]
            }
          ]
        },
        {
          model: Units,
          attributes: ["uqc", "quantity_description"]
        },
        {
          model: StockGroup,
          attributes: ["uid", "stock_name"]
        },
        {
          model: subStockGroup,
          attributes: ["uid", "stock_name"]
        }
      ]
    });
    if (createdata.length > 0) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStock fetch Successfully",
        ItemStock: createdata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStock not Found!",
        ItemStock: createdata ? createdata : []
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.createData = async function(data, res) {
  try {
    let checkdata = await ItemStock.findOne({
      where: { name: data.name, company_id: data.company_id }
    });
    if (checkdata) {
      return {
        statusCode: await checkCode("validation"),
        success: false,
        message: "ItemStock Already Exist",
        ItemStock: checkdata
      };
    } else {
      data.uid = await uniqid();
      data.creation_date = new Date();
      data.updated_date = new Date();
      let createdata = await ItemStock.create(data);
      if (createdata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "ItemStock Created Successfully",
          ItemStock: createdata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          ItemStock: createdata
        };
      }
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

exports.deleteData = async function(id, res) {
  try {
    let deletedata = await ItemStock.destroy({ where: { uid: id } });
    if (deletedata) {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "ItemStock Delete Successfully",
        ItemStock: deletedata
      };
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Something went wrong!",
        ItemStock: deletedata
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.updateData = async function(id, data, res) {
  try {
    let finddata = await ItemStock.findOne({
      where: { uid: id, company_id: data.company_id }
    });
    if (finddata) {
      data.updated_date = new Date();
      let updatedata = await finddata.update(data);
      if (updatedata) {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "ItemStock update Successfully",
          ItemStock: updatedata
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: false,
          message: "Something went wrong!",
          ItemStock: updatedata
        };
      }
    } else {
      
      return {
        statusCode: res.statusCode,
        success: false,
        message: "ItemStock not found!",
        ItemStock: finddata ? finddata : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e,
      message: "Something went wrong!"
    };
  }
};

exports.getAllStockitem = async function(data, res) {
  try {
    let openingbalance = 0;
    let oneitem = await sequelize.query(
      `SELECT items.*,units.uqc  FROM items join units on items.unit_id=units.id WHERE items. uid= '${data.item_id}'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    if (oneitem) {
      oneitem = await decreptionItem(oneitem, "array", data.data.email);
      openingbalance = Number(oneitem[0].quantity);

      // let allprivioustranstions = await sequelize.query(
      //   `select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' END AS outwards from item_entries where item_id='${data.item_id}' AND invoice_date <'${data.start_date}'`,
      //   { type: sequelize.QueryTypes.SELECT }
      // );

      let allprivioustranstions =await sequelize.query(`select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' 
      THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE 
      WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' END AS outwards 
      from item_entries where item_id='${data.item_id}' AND invoice_date <'${data.start_date}'
      UNION ALL
      select voucher_id, quantity,unit,name,type,CASE WHEN type ='Purchase' 
      THEN quantity WHEN type ='Debit' THEN quantity ELSE '' END AS inwards, CASE 
      WHEN type ='Sales' THEN quantity WHEN type ='Credit' THEN quantity ELSE '' 
      END AS outwards from item_stock_voucher_entries where item_id='${data.item_id}'
      AND invoice_date <'${data.start_date}'`,{ type: sequelize.QueryTypes.SELECT });

      if (allprivioustranstions) {
        allprivioustranstions = await decreptionItem(
          allprivioustranstions,
          "array",
          data.data.email
        );
        let inword = 0,
          outword = 0,
          totalbalnce = 0;
        await allprivioustranstions.map(item => {
          if (item.inwards) {
            inword = inword + Number(item.inwards);
          } else if (item.outwards) {
            outword = outword + Number(item.outwards);
          }
        });
        totalbalnce = inword - outword;
        openingbalance = Number(oneitem[0].quantity) + totalbalnce;
      } else {
        openingbalance = oneitem.quantity;
      }

      // let createdata = await sequelize.query(
      //   `Select le.name as ledger_name,le.amount,il.*,CASE WHEN il.invoice_id <=9 THEN
      //    CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) WHEN il.invoice_id > 9 
      //    THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) 
      //    ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  END
      //      AS new_invoiceid,CASE WHEN il.type ='Purchase' THEN il.quantity 
      //       WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
      //       CASE WHEN il.type ='Sales' THEN il.quantity 
      //       WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
      //       from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
      //       COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id, '') 
      //       AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id, '') 
      //       AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date, '') 
      //       AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year, '') 
      //       AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year, '') AS end_year, 
      //       COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
      //       RIGHT(d.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
      //       RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), '') AS end_year_c from item_entries ie 
      //       left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
      //       left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
      //       left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
      //       left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
      //        where ie.item_id='${data.item_id}' AND (ie.invoice_date >= '${data.start_date}' 
      //        AND ie.invoice_date <= '${data.end_date}') ORDER BY invoice_id ASC) il 
      //        on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC`,
      //   { type: sequelize.QueryTypes.SELECT }
      
      // );
            let createdata = await sequelize.query(`(Select le.name as ledger_name,le.amount,il.*,
              CASE WHEN il.type ='Purchase' THEN il.quantity 
               WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
               CASE WHEN il.type ='Sales' THEN il.quantity 
               WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
               from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
               COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
               AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
               AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
               AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
               AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
               COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
               RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
               RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
               (SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_entries where item_id='${data.item_id}' 
               UNION All SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='${data.item_id}' ) ie 
               left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
               left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
               left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
               left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
               left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id
                where ie.item_id='${data.item_id}' AND (ie.invoice_date >= '${data.start_date}'  
                AND ie.invoice_date <= '${data.end_date}')) il 
                on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL
      SELECT "" as ledger_name, '0' as amount, voucher_id, quantity, unit, name, type, "" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,
              CASE WHEN type ='Purchase' THEN quantity 
               WHEN type ='Debit' THEN quantity ELSE ''  END  AS outwards,
               CASE WHEN type ='Sales' THEN quantity 
               WHEN type ='Credit' THEN quantity ELSE ''  END  AS inwards  FROM item_stock_voucher_entries  where item_id='${data.item_id}' AND (invoice_date >= '${data.start_date}'  
             AND invoice_date <= '${data.end_date}')`,
         { type: sequelize.QueryTypes.SELECT }
      );


      if (createdata) {
        let response = await decreptionItem(
          createdata,
          "array",
          data.data.email
        );
        let type = "";
        if (openingbalance > 0) {
          type = "inwards";
          oneitem[0].inwards = Math.abs(openingbalance).toString();
        } else {
          type = "outwards";
          oneitem[0].outwards = Math.abs(openingbalance).toString();
        }

        oneitem[0].type = type;

        oneitem[0].quantity = Math.abs(openingbalance).toString();
        response.unshift(oneitem[0]);

        return {
          statusCode: res.statusCode,
          success: true,
          message: "Item Stock fetch Successfully",

          ItemStock: response
        };
      } else {
        return {
          statusCode: res.statusCode,
          success: true,
          message: "Item Stock not Found!",
          ItemStock: response ? response : {}
        };
      }
    } else {
      return {
        statusCode: res.statusCode,
        success: true,
        message: "Item  not Found!",
        ItemStock: response ? response : {}
      };
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

function groupBy(arr, prop, subprob) {
  const map = new Map(
    Array.from(arr, obj => [obj[subprob] ? obj[subprob] : obj[prop], []])
  );
  arr.forEach(obj =>
    map.get(obj[subprob] ? obj[subprob] : obj[prop]).push(obj)
  );
  return Array.from(map.values());
}

function search(nameKey, myArray) {
  if (myArray.length > 0) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].stock_group_id === nameKey) {
        return myArray[i];
      } else {
        return -1;
      }
    }
  } else {
    return -1;
  }
}

exports.getAllGroupStockitem = async function(data, res) {
  try {
     let groupitem = await sequelize.query(
      `select main.*,b.stock_name,c.stock_name as subgroup_name from 
      (SELECT table1.*,table2.grou_itemid as checka FROM 
      (SELECT items.*,0 as grou_itemid from items where items.company_id='${data.company_id}') table1 
      left JOIN 
      (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select uid,voucher_id	,item_id,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit,status,invoice_date,creation_date,updated_date from item_entries UNION ALL select uid ,voucher_id,item_id,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id
       where items.company_id='${data.company_id}' and (item_entries.invoice_date >= '${data.start_date}' 
       AND item_entries.invoice_date <= '${data.end_date}') group by item_entries.item_id) 
       table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b 
       on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id`,
      { type: sequelize.QueryTypes.SELECT }
    );

    console.log("groupitem", groupitem)
    if (groupitem) {

      for (const itemdata of groupitem) {
        let openingbalance = 0;
        let oneitem = await sequelize.query(
          `SELECT items.*,units.uqc  FROM items join units on 
          items.unit_id=units.id WHERE items.uid= '${itemdata.uid}'`,
          { type: sequelize.QueryTypes.SELECT }
        );
        if (oneitem) {
            
          oneitem = await decreptionItem(oneitem, "array", data.data.email);
          openingbalance = oneitem[0]?Number(oneitem[0].quantity):0;
            console.log(oneitem, "- -- - - - -", itemdata.uid);
          let allprivioustranstions = await sequelize.query(
            `select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_entries 
             where item_id='${itemdata.uid}' AND invoice_date <'${data.start_date}'
              UNION All 
             select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries 
             where item_id='${itemdata.uid}' AND invoice_date <'${data.start_date}'
             `,
            { type: sequelize.QueryTypes.SELECT }
          );

          console.log("allprivioustranstions", allprivioustranstions)

          if (allprivioustranstions) {
            allprivioustranstions = await decreptionItem(
              allprivioustranstions,
              "array",
              data.data.email
            );
            let inword = 0,
              outword = 0,
              totalbalnce = 0;
            await allprivioustranstions.map(item => {
              if (item.inwards) {
                inword = inword + Number(item.inwards);
              } else if (item.outwards) {
                outword = outword + Number(item.outwards);
              }
            });
            totalbalnce = inword - outword;
            openingbalance = oneitem[0]?Number(oneitem[0].quantity) + totalbalnce:0;
          } else {
            openingbalance = oneitem.quantity;
          }

          // let createdata = await sequelize.query(
          //   `Select le.name as ledger_name,le.amount,il.*,CASE WHEN il.invoice_id <=9 
          //   THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) 
          //   WHEN il.invoice_id > 9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) 
          //   ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  
          //   END  AS new_invoiceid,CASE WHEN il.type ='Purchase' THEN il.quantity 
          //   WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
          //   CASE WHEN il.type ='Sales' THEN il.quantity 
          //   WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
          //   from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
          //   COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id, '') AS buyer_ledger_id,
          //   COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id, '') AS invoice_id,COALESCE(a.invoice_date,
          //   b.invoice_date,c.invoice_date,d.invoice_date, '') AS invoice_date ,COALESCE(a.current_year,b.current_year,
          //   c.current_year,d.current_year, '') AS current_year ,
          //   COALESCE(a.end_year,b.end_year,c.end_year,d.end_year, '') AS end_year, 
          //   COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
          //   RIGHT(d.current_year, 2), '') AS current_year_c ,
          //   COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), '') AS end_year_c
          //    from item_entries ie left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
          //    left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id
          //     left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
          //     left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id 
          //     where ie.item_id='${itemdata.uid}' AND (ie.invoice_date >= '${data.start_date}' 
          //     AND ie.invoice_date <= '${data.end_date}') ORDER BY invoice_id ASC) il on il.buyer_ledger_id=le.uid`,
          //   { type: sequelize.QueryTypes.SELECT }
          // );

    //       console.log(`(Select le.name as ledger_name,le.amount,il.*,
    //         CASE WHEN il.type ='Purchase' THEN il.quantity 
    //          WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
    //          CASE WHEN il.type ='Sales' THEN il.quantity 
    //          WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
    //          from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
    //          COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
    //          AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
    //          AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
    //          AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
    //          AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
    //          COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
    //          RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
    //          RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
    //          (SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_entries where item_id='${itemdata.uid}' 
    //          UNION All SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='${itemdata.uid}' ) ie 
    //          left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
    //          left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
    //          left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
    //          left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
    //          left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id
    //           where ie.item_id='${itemdata.uid}' AND (ie.invoice_date >= '${data.start_date}'  
    //           AND ie.invoice_date <= '${data.end_date}')) il 
    //           on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL
    // SELECT "" as ledger_name, 0 as amount, voucher_id, quantity, unit, name, type, "" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,
    //         CASE WHEN type ='Purchase' THEN quantity 
    //          WHEN type ='Debit' THEN quantity ELSE ''  END  AS outwards,
    //          CASE WHEN type ='Sales' THEN quantity 
    //          WHEN type ='Credit' THEN quantity ELSE ''  END  AS inwards  FROM item_stock_voucher_entries  where item_id='${itemdata.uid}' AND (invoice_date >= '${data.start_date}'  
    //        AND invoice_date <= ${data.end_date})`)



    //        (Select le.name as ledger_name,le.amount,il.*,
    //         CASE WHEN il.type ='Purchase' THEN il.quantity 
    //          WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
    //          CASE WHEN il.type ='Sales' THEN il.quantity 
    //          WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
    //          from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
    //          COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
    //          AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
    //          AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
    //          AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
    //          AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
    //          COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
    //          RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
    //          RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
    //          (SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_entries where item_id='${itemdata.uid}' 
    //          UNION All SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='${itemdata.uid}' ) ie 
    //          left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
    //          left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
    //          left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
    //          left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
    //          left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id
    //           where ie.item_id='${itemdata.uid}' AND (ie.invoice_date >= '${data.start_date}'  
    //           AND ie.invoice_date <= ${data.end_date}') ORDER BY invoice_id ASC) il 
    //           on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL
    // SELECT "" as ledger_name, 0 as amount, voucher_id, quantity, unit, name, type, "" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,
    //         CASE WHEN type ='Purchase' THEN quantity 
    //          WHEN type ='Debit' THEN quantity ELSE ''  END  AS inwards,
    //          CASE WHEN type ='Sales' THEN quantity 
    //          WHEN type ='Credit' THEN quantity ELSE ''  END  AS outwards  FROM item_stock_voucher_entries  where item_id='${itemdata.uid}' AND (invoice_date >= '${data.start_date}'  
    //        AND invoice_date <= ${data.end_date}) ORDER BY invoice_id ASC


          let createdata = await sequelize.query(`(Select le.name as ledger_name,le.amount,il.*,
            CASE WHEN il.type ='Purchase' THEN il.quantity 
             WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
             CASE WHEN il.type ='Sales' THEN il.quantity 
             WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
             from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
             COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
             AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
             AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
             AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
             AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
             COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
             RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
             RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
             (SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_entries where item_id='${itemdata.uid}' 
             UNION All SELECT uid ,voucher_id	,item_id	,quantity,name,description,model,hsn_code,price,discount,discount_type,total_amount,igst_tax,type,unit	,status,invoice_date,creation_date,updated_date from item_stock_voucher_entries where item_id='${itemdata.uid}' ) ie 
             left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
             left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
             left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
             left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
             left join ( select * from item_stock_vouchers ) e on e.uid = ie.voucher_id
              where ie.item_id='${itemdata.uid}' AND (ie.invoice_date >= '${data.start_date}'  
              AND ie.invoice_date <= '${data.end_date}')) il 
              on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC) UNION ALL
    SELECT "" as ledger_name, '0' as amount, voucher_id, quantity, unit, name, type, "" as buyer_ledger_id, (select invoice_id from item_stock_vouchers where uid=voucher_id) as invoice_id, invoice_date, (select current_year from item_stock_vouchers where uid=voucher_id) as current_year, (select end_year from item_stock_vouchers where uid=voucher_id) as end_year, COALESCE(RIGHT((select current_year from item_stock_vouchers where uid=voucher_id), 2), '') AS current_year_c, COALESCE(RIGHT((select end_year from item_stock_vouchers where uid=voucher_id), 2), '') AS end_year_c,
            CASE WHEN type ='Purchase' THEN quantity 
             WHEN type ='Debit' THEN quantity ELSE ''  END  AS outwards,
             CASE WHEN type ='Sales' THEN quantity 
             WHEN type ='Credit' THEN quantity ELSE ''  END  AS inwards  FROM item_stock_voucher_entries  where item_id='${itemdata.uid}' AND (invoice_date >= '${data.start_date}'  
           AND invoice_date <= '${data.end_date}')`,
         { type: sequelize.QueryTypes.SELECT }
      );

      // return {createdata:createdata}
          if (createdata) {
              
            let type = "";
            if (openingbalance > 0) {
              type = "inwards";
              oneitem[0].inwards = Math.abs(openingbalance).toString();
            } else {
              type = "outwards";
              oneitem[0].outwards = Math.abs(openingbalance).toString();
            }

            let response = await decreptionItem(
              createdata,
              "array",
              data.data.email
            );

            var total_inwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.inwards);

              // set initial value as 0
            }, 0);

            var total_outwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.outwards);

              // set initial value as 0
            }, 0);

            oneitem[0].type = type;

            oneitem[0].quantity = Math.abs(openingbalance).toString();
            //response.unshift(oneitem[0]);
            let closing_balanse =
              Number(openingbalance) -
              Number(total_outwards) +
              Number(total_inwards);

            itemdata.tl_inwards = total_inwards;
            itemdata.tl_outwards = total_outwards;
            itemdata.unit = oneitem[0].uqc;
            itemdata.openingbalance = Math.abs(openingbalance).toString();
            itemdata.type = type;

            itemdata.closingbalnce = Math.abs(closing_balanse).toString();
            itemdata.closingbalnce_type =
              closing_balanse > 0 ? "inward" : "outward";

          } else {
           
          }


        } else {
        console.log("goto else")
        }
      }
     

        let response1 = await decreptionItem(groupitem, "array", data.data.email);
       
       response1 = response1.filter(function( obj ) {
    return !(obj.checka == null && Number(obj.openingbalance)==0);
            });
       
        let lastgroupitem = groupBy(
          response1,
          "stock_group_id",
          "stock_sub_group_id"
        );

        if(lastgroupitem.length>0){
          return {
            statusCode: res.statusCode,
            success: true,
            message: "Item Stock fetch Successfully",
            ItemStock: lastgroupitem
          };
        }else{
          return {
            statusCode: res.statusCode,
            success: false,
            message: "Item Stock not found",
            ItemStock: lastgroupitem
          };
        } 
    } else {
      return {
        statusCode: res.statusCode,
        success: false,
        message: "Data not Found!",
        ItemStock: response ? response : {}
      };
    }
  } catch (e) {
    console.log("error", e)
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};


exports.getAllGroupStockitemcalculation = async function(type,company_id,start_date,end_date,email, res) {
  try {
   let groupstockvalue=0;
   let groupitem=null;
      console.log("type value", type)
      if(type=="open"){
            groupitem = await sequelize.query(
                  `select main.*,b.stock_name,c.stock_name as subgroup_name from 
                  (SELECT table1.*,table2.grou_itemid as checka FROM 
                  (SELECT items.*,0 as grou_itemid from items where items.company_id='${company_id}') table1 
                  left JOIN 
                  (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id
                  where items.company_id='${company_id}' and (item_entries.invoice_date >= '${start_date}' 
                  AND item_entries.invoice_date <= '${end_date}') group by item_entries.item_id) 
                  table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b 
                  on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id`,
                  { type: sequelize.QueryTypes.SELECT }
                );
      }else{
          groupitem = await sequelize.query(
                `select main.*,b.stock_name,c.stock_name as subgroup_name from 
                (SELECT table1.*,table2.grou_itemid as checka FROM 
                (SELECT items.*,0 as grou_itemid from items where items.company_id='${company_id}') table1 
                left JOIN 
                (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id
                where items.company_id='${company_id}' and (item_entries.invoice_date >= '${start_date}' 
                AND item_entries.invoice_date <= '${end_date}') group by item_entries.item_id) 
                table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b 
                on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id`,
                { type: sequelize.QueryTypes.SELECT }
              );
      }
    if (groupitem) {
      for (const itemdata of groupitem) {
        let openingbalance = 0;
        let oneitem = await sequelize.query(
          `SELECT items.*,units.uqc  FROM items join units on 
          items.unit_id=units.id WHERE items. uid= '${itemdata.uid}'`,
          { type: sequelize.QueryTypes.SELECT }
        );
        if (oneitem) {
          oneitem = await decreptionItem(oneitem, "array", email);
          openingbalance = oneitem[0]?Number(oneitem[0].quantity):0;
          let allprivioustranstions = await sequelize.query(
            `select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_entries 
             where item_id='${itemdata.uid}' AND invoice_date < ' ${start_date}'
              UNION All 
             select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries 
             where item_id='${itemdata.uid}' AND invoice_date <' ${start_date}'
             `,
            { type: sequelize.QueryTypes.SELECT }
          );

          if (allprivioustranstions) {
            allprivioustranstions = await decreptionItem(
              allprivioustranstions,
              "array",
              email
            );
            let inword = 0,
              outword = 0,
              totalbalnce = 0;
            await allprivioustranstions.map(item => {
              if (item.inwards) {
                inword = inword + Number(item.inwards);
              } else if (item.outwards) {
                outword = outword + Number(item.outwards);
              }
            });
            totalbalnce = inword - outword;
            console.log("totalbalnce", openingbalance, totalbalnce, inword, outword);
            openingbalance = oneitem[0]?Number(oneitem[0].quantity) + totalbalnce:0;
          } else {
            openingbalance = oneitem.quantity;
          }

          let createdata = await sequelize.query(`Select le.name as ledger_name,le.amount,il.*,
            CASE WHEN il.invoice_id <=9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) 
            WHEN il.invoice_id > 9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) 
            ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  END
           AS new_invoiceid,
           CASE WHEN il.type ='Purchase' THEN il.quantity 
            WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
            CASE WHEN il.type ='Sales' THEN il.quantity 
            WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
            from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
            COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
            AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
            AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
            AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
            AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
            COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
            RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
            RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
            (SELECT * from item_entries where item_id='${itemdata.uid}' 
            UNION All SELECT * from item_stock_voucher_entries where item_id='${itemdata.uid}' ) ie 
            left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
            left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
            left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
            left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
            left join ( select * from journal_vouchers ) e on e.uid = ie.voucher_id
             where ie.item_id='${itemdata.uid}' AND (ie.invoice_date >= '${start_date}' 
             AND ie.invoice_date <= '${end_date}') ORDER BY invoice_id ASC) il 
             on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC`,
         { type: sequelize.QueryTypes.SELECT });
          if (createdata) {
              
            let type = "";
            if (openingbalance > 0) {
              type = "inwards";
              oneitem[0].inwards = Math.abs(openingbalance).toString();
            } else {
              type = "outwards";
              oneitem[0].outwards = Math.abs(openingbalance).toString();
            }

            let response = await decreptionItem(
              createdata,
              "array",
              email
            );

            var total_inwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.inwards);

              // set initial value as 0
            }, 0);

            var total_outwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.outwards);

              // set initial value as 0
            }, 0);

            oneitem[0].type = type;

            oneitem[0].quantity = Math.abs(openingbalance).toString();
            //response.unshift(oneitem[0]);
            let closing_balanse =
              Number(openingbalance) -
              Number(total_outwards) +
              Number(total_inwards);

            itemdata.tl_inwards = total_inwards;
            itemdata.tl_outwards = total_outwards;
            itemdata.unit = oneitem[0].uqc;
            itemdata.openingbalance = Math.abs(openingbalance).toString();
            itemdata.type = type;

            itemdata.closingbalnce = Math.abs(closing_balanse).toString();
            itemdata.closingbalnce_type =
              closing_balanse > 0 ? "inward" : "outward";
               if(itemdata.closingbalnce_type==='inward'){
                     itemdata.totalamountclosing= Number(itemdata.rate)*Number(itemdata.closingbalnce);
               }else{
                itemdata.totalamountclosing= -Number(itemdata.rate)*Number(itemdata.closingbalnce);
               }
          } else {
           
          }


        } else {
        
        }
      }
     

        let response1 = await decreptionItem(groupitem, "array", email);
       
       response1 = response1.filter(function( obj ) {
         console.log("obj.openingbalance", obj.openingbalance, obj.checka)
                return !(obj.checka == null && Number(obj.openingbalance)==0);
            });

          console.log("response1", response1)
       
         var result = response1.reduce(function(tot, arr) { 
  // return the sum with previous value
 
            let point=0;
            if(arr.closingbalnce_type==='outward'){
              // console.log("if arr.rate", arr.rate, arr.closingbalnce)
                point=arr.rate && Number(arr.rate)?-Number(arr.rate)*Number(arr.closingbalnce):-Number(0)*Number(arr.closingbalnce);
            }else{
              // console.log("else arr.rate", arr.rate, arr.closingbalnce)
                point=arr.rate && Number(arr.rate)?Number(arr.rate)*Number(arr.closingbalnce):Number(0)*Number(arr.closingbalnce);
            }
          //  console.log("rate",arr.rate);
          //    console.log("balnce",arr.closingbalnce);
          //    console.log("point",point)

            return Number(tot) + Number(point);
            // set initial value as 0
          },0);
       console.log("groupitem = = = =", result)
      return result;
    } else {
      return groupstockvalue;
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};


exports.getOpenGroupStockitemcalculation = async function(type,company_id,start_date,end_date,email, res) {
  try {
   let groupstockvalue=0;
   let groupitem=null;
      console.log("type value", type)
      if(type=="open"){
            groupitem = await sequelize.query(
                  `select main.*,b.stock_name,c.stock_name as subgroup_name from 
                  (SELECT table1.*,table2.grou_itemid as checka FROM 
                  (SELECT items.*,0 as grou_itemid from items where items.company_id='${company_id}') table1 
                  left JOIN 
                  (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id
                  where items.company_id='${company_id}' and (item_entries.invoice_date > '${start_date}') group by item_entries.item_id) 
                  table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b 
                  on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id`,
                  { type: sequelize.QueryTypes.SELECT }
                );
      }else{
          groupitem = await sequelize.query(
                `select main.*,b.stock_name,c.stock_name as subgroup_name from 
                (SELECT table1.*,table2.grou_itemid as checka FROM 
                (SELECT items.*,0 as grou_itemid from items where items.company_id='${company_id}') table1 
                left JOIN 
                (SELECT items.*,item_entries.item_id as grou_itemid FROM items left join (select * from item_entries  UNION ALL select * from item_stock_voucher_entries) item_entries on items.uid=item_entries.item_id
                where items.company_id='${company_id}' and (item_entries.invoice_date >= '${start_date}' 
                AND item_entries.invoice_date <= '${end_date}') group by item_entries.item_id) 
                table2 on table2.id = table1.id GROUP BY table1.id) main left join (SELECT * from stock_groups) b 
                on b.uid=main.stock_group_id left join (SELECT * from stock_sub_groups) c on c.uid=main.stock_sub_group_id`,
                { type: sequelize.QueryTypes.SELECT }
              );
      }
    if (groupitem) {
      for (const itemdata of groupitem) {
        let openingbalance = 0;
        let oneitem = await sequelize.query(
          `SELECT items.*,units.uqc  FROM items join units on 
          items.unit_id=units.id WHERE items. uid= '${itemdata.uid}'`,
          { type: sequelize.QueryTypes.SELECT }
        );
        if (oneitem) {
          oneitem = await decreptionItem(oneitem, "array", email);
          openingbalance = oneitem[0]?Number(oneitem[0].quantity):0;
          let allprivioustranstions = await sequelize.query(
            `select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_entries 
             where item_id='${itemdata.uid}' AND invoice_date < ' ${start_date}'
              UNION All 
             select voucher_id, quantity,unit,name,type,
            CASE WHEN type ='Purchase' THEN quantity 
            WHEN type ='Debit' THEN quantity ELSE '' END AS inwards,
             CASE WHEN type ='Sales' THEN quantity WHEN type ='Credit' 
             THEN quantity ELSE '' END AS outwards from item_stock_voucher_entries 
             where item_id='${itemdata.uid}' AND invoice_date <' ${start_date}'
             `,
            { type: sequelize.QueryTypes.SELECT }
          );

          if (allprivioustranstions) {
            allprivioustranstions = await decreptionItem(
              allprivioustranstions,
              "array",
              email
            );
            let inword = 0,
              outword = 0,
              totalbalnce = 0;
            await allprivioustranstions.map(item => {
              if (item.inwards) {
                inword = inword + Number(item.inwards);
              } else if (item.outwards) {
                outword = outword + Number(item.outwards);
              }
            });
            totalbalnce = inword - outword;
            console.log("totalbalnce", openingbalance, totalbalnce, inword, outword);
            openingbalance = oneitem[0]?Number(oneitem[0].quantity) + totalbalnce:0;
          } else {
            openingbalance = oneitem.quantity;
          }

          let createdata = await sequelize.query(`Select le.name as ledger_name,le.amount,il.*,
            CASE WHEN il.invoice_id <=9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/00',il.invoice_id ) 
            WHEN il.invoice_id > 9 THEN CONCAT( il.current_year_c, '-', il.end_year_c,'/0',il.invoice_id ) 
            ELSE CONCAT( il.current_year_c, '-', il.end_year_c,'/',il.invoice_id )  END
           AS new_invoiceid,
           CASE WHEN il.type ='Purchase' THEN il.quantity 
            WHEN il.type ='Debit' THEN il.quantity ELSE ''  END  AS inwards,
            CASE WHEN il.type ='Sales' THEN il.quantity 
            WHEN il.type ='Credit' THEN il.quantity ELSE ''  END  AS outwards 
            from ledgers le join ( select ie.voucher_id, ie.quantity,ie.unit,ie.name,ie.type, 
            COALESCE(a.buyer_ledger_id,b.buyer_ledger_id,c.buyer_ledger_id,d.buyer_ledger_id,e.ledger_id, '') 
            AS buyer_ledger_id,COALESCE(a.invoice_id,b.invoice_id,c.invoice_id,d.invoice_id,e.invoice_id, '') 
            AS invoice_id,COALESCE(a.invoice_date,b.invoice_date,c.invoice_date,d.invoice_date,e.invoice_date, '') 
            AS invoice_date ,COALESCE(a.current_year,b.current_year,c.current_year,d.current_year,e.current_year, '') 
            AS current_year ,COALESCE(a.end_year,b.end_year,c.end_year,d.end_year,e.end_year, '') AS end_year, 
            COALESCE(RIGHT(a.current_year, 2),RIGHT(b.current_year, 2),RIGHT(c.current_year, 2),
            RIGHT(d.current_year, 2), RIGHT(e.current_year, 2), '') AS current_year_c ,COALESCE(RIGHT(a.end_year, 2),RIGHT(b.end_year, 2),
            RIGHT(c.end_year, 2),RIGHT(d.end_year, 2), RIGHT(e.end_year, 2), '') AS end_year_c from 
            (SELECT * from item_entries where item_id='${itemdata.uid}' 
            UNION All SELECT * from item_stock_voucher_entries where item_id='${itemdata.uid}' ) ie 
            left join ( select * from credit_vouchers ) a on a.uid = ie.voucher_id 
            left join ( select * from debit_vouchers ) b on b.uid = ie.voucher_id 
            left join ( select * from sales_vouchers ) c on c.uid = ie.voucher_id 
            left join ( select * from purchase_vouchers ) d on d.uid = ie.voucher_id
            left join ( select * from journal_vouchers ) e on e.uid = ie.voucher_id
             where ie.item_id='${itemdata.uid}' AND (ie.invoice_date > '${start_date}') ORDER BY invoice_id ASC) il 
             on il.buyer_ledger_id=le.uid ORDER BY invoice_date ASC`,
         { type: sequelize.QueryTypes.SELECT });
          if (createdata) {
              
            let type = "";
            if (openingbalance > 0) {
              type = "inwards";
              oneitem[0].inwards = Math.abs(openingbalance).toString();
            } else {
              type = "outwards";
              oneitem[0].outwards = Math.abs(openingbalance).toString();
            }

            let response = await decreptionItem(
              createdata,
              "array",
              email
            );

            var total_inwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.inwards);

              // set initial value as 0
            }, 0);

            var total_outwards = response.reduce(function(tot, arr) {
              // return the sum with previous value
              return tot + Number(arr.outwards);

              // set initial value as 0
            }, 0);

            oneitem[0].type = type;

            oneitem[0].quantity = Math.abs(openingbalance).toString();
            //response.unshift(oneitem[0]);
            let closing_balanse =
              Number(openingbalance) -
              Number(total_outwards) +
              Number(total_inwards);

            itemdata.tl_inwards = total_inwards;
            itemdata.tl_outwards = total_outwards;
            itemdata.unit = oneitem[0].uqc;
            itemdata.openingbalance = Math.abs(openingbalance).toString();
            itemdata.type = type;

            itemdata.closingbalnce = Math.abs(closing_balanse).toString();
            itemdata.closingbalnce_type =
              closing_balanse > 0 ? "inward" : "outward";
               if(itemdata.closingbalnce_type==='inward'){
                     itemdata.totalamountclosing= Number(itemdata.rate)*Number(itemdata.closingbalnce);
               }else{
                itemdata.totalamountclosing= -Number(itemdata.rate)*Number(itemdata.closingbalnce);
               }
          } else {
           
          }


        } else {
        
        }
      }
     

        let response1 = await decreptionItem(groupitem, "array", email);
       
       response1 = response1.filter(function( obj ) {
         console.log("obj.openingbalance", obj.openingbalance, obj.checka)
                return !(obj.checka == null && Number(obj.openingbalance)==0);
            });

          console.log("response1", response1)
       
         var result = response1.reduce(function(tot, arr) { 
  // return the sum with previous value
 
            let point=0;
            if(arr.closingbalnce_type==='outward'){
              // console.log("if arr.rate", arr.rate, arr.closingbalnce)
                point=arr.rate && Number(arr.rate)?-Number(arr.rate)*Number(arr.closingbalnce):-Number(0)*Number(arr.closingbalnce);
            }else{
              // console.log("else arr.rate", arr.rate, arr.closingbalnce)
                point=arr.rate && Number(arr.rate)?Number(arr.rate)*Number(arr.closingbalnce):Number(0)*Number(arr.closingbalnce);
            }
          //  console.log("rate",arr.rate);
          //    console.log("balnce",arr.closingbalnce);
          //    console.log("point",point)

            return Number(tot) + Number(point);
            // set initial value as 0
          },0);
       console.log("groupitem = = = =", result)
      return result;
    } else {
      return groupstockvalue;
    }
  } catch (e) {
    return {
      statusCode: res.statusCode,
      success: false,
      error: e.message,
      message: "Something went wrong!"
    };
  }
};

